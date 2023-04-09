import { ESLintUtils } from '@typescript-eslint/utils';
import { CallExpression, ObjectExpression, Property, Identifier, ArrayExpression } from '@typescript-eslint/types/dist/generated/ast-spec';
import { RuleFix, RuleFixer, RuleListener } from '@typescript-eslint/utils/dist/ts-eslint';

const ruleCreator = ESLintUtils.RuleCreator((name) => `https://github.com/ducktordanny/eslint-plugin-ng-module-sort#${name}`);

const DECORATORS: Array<string> = [
  'NgModule',
  'Component',
  'Pipe',
  'Decorator',
  'Module',
];

const MODULE_PROPERTIES: Array<string> = [
  'imports',
  'declarations',
  'exports',
  'providers',
  'controllers',
  'bootstrap',
];

const orderCheck = (elements: Array<Identifier>, reverseSort: boolean): boolean => {
  const elementNames = elements.map(el => el.name);
  const orderedElementNames = [...elementNames].sort();
  if (reverseSort) orderedElementNames.reverse();
  return JSON.stringify(elementNames) === JSON.stringify(orderedElementNames);
};

const orderFixer = (fixer: RuleFixer, node: ArrayExpression, reverseSort: boolean): RuleFix => {
  const elements = node.elements as Array<Identifier>;
  const fix = elements.map(el => el.name).sort();
  if (reverseSort) fix.reverse();
  return fixer.replaceText(node, `[${fix.join(', ')}]`);
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
      {reverseSort: false},
    ],
  },

  create(context): RuleListener {
    const reverseSort = context?.options?.[0]?.['reverseSort'] as boolean;

    return {
      Decorator(node): void {
        const callExp = node?.expression as CallExpression
        const decoratorName = (callExp?.callee as Identifier)?.name;
        if (!DECORATORS.some(dec => dec === decoratorName)) return;

        const arg = (callExp?.arguments as Array<ObjectExpression>)?.[0];
        if (!arg) return;

        const properties = arg?.properties as Array<Property>;
        if (!properties) return;

        const knownProperties = properties.filter(prop => {
          const keyName = (prop.key as Identifier)?.name;
          return MODULE_PROPERTIES.some(mProp => mProp === keyName);
        });
        if (!knownProperties || knownProperties.length === 0) return;

        knownProperties.forEach(prop => {
          const keyName = (prop.key as Identifier)?.name;
          const arrayExpression = prop.value as ArrayExpression;
          const elements = arrayExpression.elements as Array<Identifier>;
          const isOrdered = orderCheck(elements, reverseSort);
          if (isOrdered) return;

          context.report({
            node: arrayExpression,
            messageId: 'wrongOrderOfDecoratorArrayItems',
            data: {
              property: keyName,
            },
            fix: (fixer) => orderFixer(fixer, arrayExpression, reverseSort),
          });
        });
      },
    };
  },

  defaultOptions: [],
});

