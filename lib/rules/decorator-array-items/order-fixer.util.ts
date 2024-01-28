import {
  ArrayExpression,
  Identifier,
} from "@typescript-eslint/types/dist/generated/ast-spec";
import { RuleFix, RuleFixer } from "@typescript-eslint/utils/dist/ts-eslint";

import { DecoratorArrayItemsRuleContext } from "../../types";

export const orderFixer = (
  fixer: RuleFixer,
  context: DecoratorArrayItemsRuleContext,
  node: ArrayExpression,
  reverseSort: boolean,
): RuleFix => {
  const sourceCode = context.getSourceCode();
  const elements = node.elements as Array<Identifier>;
  const fix = elements.map((el) => sourceCode.getText(el)).sort();
  if (reverseSort) fix.reverse();
  return fixer.replaceText(node, `[\n${fix.join(",\n")}\n]`);
};
