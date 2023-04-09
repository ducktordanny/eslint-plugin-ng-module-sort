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

const orderCheck = (elements: Array<Identifier>): boolean => {
  const elementNames = elements.map(el => el.name);
  const orderedElementNames = [...elementNames].sort();
  return JSON.stringify(elementNames) === JSON.stringify(orderedElementNames);
};

const orderFixer = (fixer: RuleFixer): RuleFix | null => {
  // TODO implement
  return null;
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
    schema: {},
  },
  create(context): RuleListener {
    return {
      Decorator(node) {
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
          const elements = (prop.value as ArrayExpression).elements as Array<Identifier>;
          const isOrdered = orderCheck(elements);
          if (isOrdered) return;
          context.report({
            node: prop,
            messageId: 'wrongOrderOfDecoratorArrayItems',
            data: {
              property: keyName,
            },
            fix: orderFixer,
          });
        });
      },
    };
  },
  defaultOptions: [],
});

