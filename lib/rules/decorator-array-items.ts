import { Identifier, ArrayExpression, Decorator } from '@typescript-eslint/types/dist/generated/ast-spec';
import { RuleContext, RuleFix, RuleFixer, RuleListener } from '@typescript-eslint/utils/dist/ts-eslint';
import { getPropertiesOfDecorator, ruleCreator } from '../shared';

type DecoratorArrayItemsRuleContext = RuleContext<'wrongOrderOfDecoratorArrayItems', Array<{reverseSort: boolean}>>;

const MODULE_PROPERTIES: Array<string> = [
  'imports',
  'declarations',
  'exports',
  'providers',
  'controllers',
  'bootstrap',
];

const orderCheck = (context: DecoratorArrayItemsRuleContext, elements: Array<Identifier>, reverseSort: boolean): boolean => {
  const sourceCode = context.getSourceCode();
  const elementNames = elements.map(el => sourceCode.getText(el));
  const orderedElementNames = [...elementNames].sort();
  if (reverseSort) orderedElementNames.reverse();
  return JSON.stringify(elementNames) === JSON.stringify(orderedElementNames);
};

const orderFixer = (fixer: RuleFixer, context: DecoratorArrayItemsRuleContext, node: ArrayExpression, reverseSort: boolean): RuleFix => {
  const sourceCode = context.getSourceCode();
  const elements = node.elements as Array<Identifier>;
  const fix = elements.map(el => sourceCode.getText(el)).sort();
  if (reverseSort) fix.reverse();
  return fixer.replaceText(node, `[\n${fix.join(',\n')}\n]`);
};

export const decoratorArrayItemsRule = ruleCreator({
  name: 'decorator-array-items',
  meta: {
    type: 'layout',
    docs: {
      description: 'Checks if the Angular or NestJS module related metadata has ordered arrays, and provide an autofix to sort them.',
      recommended: 'error',
    },
    messages: {
      wrongOrderOfDecoratorArrayItems: 'Run `eslint --fix .` to sort the members of {{ property }}.',
    },
    fixable: 'code',
    schema: [
      { reverseSort: false },
    ],
  },

  create(context: DecoratorArrayItemsRuleContext): RuleListener {
    const reverseSort = context?.options?.[0]?.['reverseSort'] as boolean;

    return {
      Decorator(node: Decorator): void {
        const properties = getPropertiesOfDecorator(node);

        const knownProperties = properties?.filter(prop => {
          const keyName = (prop.key as Identifier)?.name;
          return MODULE_PROPERTIES.some(mProp => mProp === keyName);
        });
        if (!knownProperties || knownProperties.length === 0) return;

        knownProperties.forEach(prop => {
          const keyName = (prop.key as Identifier)?.name;
          const arrayExpression = prop.value as ArrayExpression;
          const elements = arrayExpression.elements as Array<Identifier>;
          const isOrdered = orderCheck(context, elements, reverseSort);
          if (isOrdered) return;

          context.report({
            node: arrayExpression,
            messageId: 'wrongOrderOfDecoratorArrayItems',
            data: {
              property: keyName,
            },
            fix: (fixer) => orderFixer(fixer, context, arrayExpression, reverseSort),
          });
        });
      },
    };
  },

  defaultOptions: [],
});
