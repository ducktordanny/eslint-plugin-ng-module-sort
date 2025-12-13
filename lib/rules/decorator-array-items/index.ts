import {TSESTree, ESLintUtils, TSESLint} from '@typescript-eslint/utils';

import {orderCheck} from './order-check.util';
import {orderFixer} from './order-fixer.util';

import {DecoratorArrayItemsRuleContext, RuleOptions, RuleSettings} from '../../types';
import {getKnownProperties, getPropertiesOfDecorator, ruleCreator} from '../../utils';

const defaultOptions = {
  reverseSort: false,
  extraDecorators: [],
  extraProperties: [],
} satisfies RuleSettings;

const meta: ESLintUtils.NamedCreateRuleMeta<
  'wrongOrderOfDecoratorArrayItems',
  unknown,
  RuleOptions[]
> = {
  type: 'layout',
  docs: {
    description:
      'Checks if the Angular or NestJS module related metadata has ordered arrays, and provide an autofix to sort them.',
  },
  messages: {
    wrongOrderOfDecoratorArrayItems: 'Run `eslint --fix .` to sort the members of {{ property }}.',
  },
  fixable: 'code',
  defaultOptions: [defaultOptions],
  schema: [
    {
      type: 'object',
      properties: {
        reverseSort: {type: 'boolean'},
        extraDecorators: {type: 'array', items: {type: 'string'}},
        extraProperties: {type: 'array', items: {type: 'string'}},
      },
      additionalProperties: false,
    },
  ],
};

function create(context: DecoratorArrayItemsRuleContext): ESLintUtils.RuleListener {
  const {reverseSort, extraDecorators, extraProperties} = {
    ...context.options[0],
    ...defaultOptions,
  } as RuleSettings;

  return {
    Decorator(node: TSESTree.Decorator): void {
      const properties = getPropertiesOfDecorator(node, extraDecorators);
      if (!properties) return;

      const knownProperties = getKnownProperties(properties, extraProperties);
      if (!knownProperties || knownProperties.length === 0) return;

      knownProperties.forEach((prop) => {
        const keyName = (prop.key as TSESTree.Identifier)?.name;
        const arrayExpression = prop.value as TSESTree.ArrayExpression;
        const elements = arrayExpression.elements as Array<TSESTree.Identifier>;
        if (!elements || !elements.length) return;
        const isOrdered = orderCheck(context, elements, reverseSort);
        if (isOrdered) return;

        context.report({
          node: arrayExpression,
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {
            property: keyName,
          },
          fix: (fixer: TSESLint.RuleFixer) =>
            orderFixer(fixer, context, arrayExpression, reverseSort),
        });
      });
    },
  };
}

export const DECORATOR_ARRAY_ITEMS_NAME = 'decorator-array-items';
export const decoratorArrayItemsRule = ruleCreator({
  name: DECORATOR_ARRAY_ITEMS_NAME,
  meta,
  defaultOptions: [defaultOptions],
  create,
});
