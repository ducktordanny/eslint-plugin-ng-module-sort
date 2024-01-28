import { Identifier } from "@typescript-eslint/types/dist/generated/ast-spec";

import { DecoratorArrayItemsRuleContext } from "../../types";

export const orderCheck = (
  context: DecoratorArrayItemsRuleContext,
  elements: Array<Identifier>,
  reverseSort: boolean,
): boolean => {
  const sourceCode = context.getSourceCode();
  const elementNames = elements.map((el) => sourceCode.getText(el));
  const orderedElementNames = [...elementNames].sort();
  if (reverseSort) orderedElementNames.reverse();
  return JSON.stringify(elementNames) === JSON.stringify(orderedElementNames);
};
