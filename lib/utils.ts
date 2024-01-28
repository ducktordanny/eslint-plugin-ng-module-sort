import {
  CallExpression,
  Decorator,
  Identifier,
  ObjectExpression,
  Property,
} from "@typescript-eslint/types/dist/generated/ast-spec";
import { ESLintUtils } from "@typescript-eslint/utils";

import { DECORATORS } from "./contants";

export const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/ducktordanny/eslint-plugin-ng-module-sort#${name}`,
);

export function getPropertiesOfDecorator(
  node: Decorator,
  argIndex: number = 0,
): Array<Property> | undefined {
  const callExp = node?.expression as CallExpression;
  const decoratorName = (callExp?.callee as Identifier)?.name;
  if (!DECORATORS.some((dec) => dec === decoratorName)) return;

  const arg = (callExp?.arguments as Array<ObjectExpression>)?.[argIndex];
  if (!arg || arg?.type !== "ObjectExpression") return;

  const properties = arg?.properties as Array<Property>;
  return properties;
}
