import {
  Identifier,
  ArrayExpression,
  Decorator,
} from '@typescript-eslint/types/dist/generated/ast-spec';
import {RuleListener} from '@typescript-eslint/utils/dist/ts-eslint';

import {orderCheck} from './order-check.util';
import {orderFixer} from './order-fixer.util';

import {DecoratorArrayItemsRuleContext, RuleOptions} from '../../types';
import {getKnownProperties, getPropertiesOfDecorator, ruleCreator} from '../../utils';
import {NamedCreateRuleMeta} from '@typescript-eslint/utils/dist/eslint-utils';

const name = 'decorator-array-items';
const defaultOptions = {
  reverseSort: false,
  extraDecorators: [],
  extraProperties: [],
} as RuleOptions;

const meta: NamedCreateRuleMeta<'wrongOrderOfDecoratorArrayItems'> = {
  type: 'layout',
  docs: {
    description:
      'Checks if the Angular or NestJS module related metadata has ordered arrays, and provide an autofix to sort them.',
    recommended: 'error',
  },
  messages: {
    wrongOrderOfDecoratorArrayItems: 'Run `eslint --fix .` to sort the members of {{ property }}.',
  },
  fixable: 'code',
  schema: [defaultOptions],
};

function create(context: DecoratorArrayItemsRuleContext): RuleListener {
  const options = (context?.options?.[0] || defaultOptions) as RuleOptions;
  const reverseSort = options.reverseSort ?? defaultOptions.reverseSort;
  const extraDecorators = options.extraDecorators || defaultOptions.extraDecorators;
  const extraProperties = options.extraProperties || defaultOptions.extraProperties;

  return {
    Decorator(node: Decorator): void {
      const properties = getPropertiesOfDecorator(node, extraDecorators);
      if (!properties) return;

      const knownProperties = getKnownProperties(properties, extraProperties);
      if (!knownProperties || knownProperties.length === 0) return;

      knownProperties.forEach((prop) => {
        const keyName = (prop.key as Identifier)?.name;
        const arrayExpression = prop.value as ArrayExpression;
        const elements = arrayExpression.elements as Array<Identifier>;
        if (!elements || !elements.length) return;
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
}

export const decoratorArrayItemsRule = ruleCreator({
  name,
  meta,
  create,
  defaultOptions: [],
});
