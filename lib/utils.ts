import {
  CallExpression,
  Decorator,
  Identifier,
  ObjectExpression,
  Property,
} from '@typescript-eslint/types/dist/generated/ast-spec';
import {ESLintUtils} from '@typescript-eslint/utils';

import {DECORATORS, MODULE_PROPERTIES} from './contants';

export const ruleCreator = ESLintUtils.RuleCreator(
  (name) => `https://github.com/ducktordanny/eslint-plugin-ng-module-sort#${name}`,
);

export function getPropertiesOfDecorator(
  node: Decorator,
  extras: Array<string>,
  argIndex: number = 0,
): Array<Property> | undefined {
  const callExp = node?.expression as CallExpression;
  const decoratorName = (callExp?.callee as Identifier)?.name;
  if (![...DECORATORS, ...extras].some((dec) => dec === decoratorName)) return;

  const arg = (callExp?.arguments as Array<ObjectExpression>)?.[argIndex];
  if (!arg || arg?.type !== 'ObjectExpression') return;

  const properties = arg?.properties as Array<Property>;
  return properties;
}

export function getKnownProperties(
  properties: Array<Property>,
  extras: Array<string>,
): Array<Property> {
  return properties?.filter((prop) => {
    const keyName = (prop.key as Identifier)?.name;
    return [...MODULE_PROPERTIES, ...extras].some((mProp) => mProp === keyName);
  });
}
