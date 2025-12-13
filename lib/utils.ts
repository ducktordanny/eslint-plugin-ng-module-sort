import {TSESTree, ESLintUtils} from '@typescript-eslint/utils';

import {DECORATORS, MODULE_PROPERTIES} from './constants';

export const ruleCreator = ESLintUtils.RuleCreator(
  (name) => `https://github.com/ducktordanny/eslint-plugin-ng-module-sort#${name}`,
);

export function getPropertiesOfDecorator(
  node: TSESTree.Decorator,
  extras: Array<string>,
  argIndex: number = 0,
): Array<TSESTree.Property> | undefined {
  const callExp = node?.expression as TSESTree.CallExpression;
  const decoratorName = (callExp?.callee as TSESTree.Identifier)?.name;
  if (![...DECORATORS, ...extras].some((dec) => dec === decoratorName)) return;

  const arg = (callExp?.arguments as Array<TSESTree.ObjectExpression>)?.[argIndex];
  if (!arg || arg?.type !== 'ObjectExpression') return;

  const properties = arg?.properties as Array<TSESTree.Property>;
  return properties;
}

export function getKnownProperties(
  properties: Array<TSESTree.Property>,
  extras: Array<string>,
): Array<TSESTree.Property> {
  return properties?.filter((prop) => {
    const keyName = (prop.key as TSESTree.Identifier)?.name;
    return [...MODULE_PROPERTIES, ...extras].some((mProp) => mProp === keyName);
  });
}
