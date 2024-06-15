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
): RuleFix | null => {
  const sourceCode = context.getSourceCode();
  const elements = node.elements as Array<Identifier>;
  const sortedElements = elements.map((el) => sourceCode.getText(el)).sort();
  if (reverseSort) sortedElements.reverse();

  let joinSeparator = ", ";
  const start = elements?.at(0)?.loc?.start;
  const end = elements?.at(-1)?.loc?.start;
  if (start && end && start.line !== end.line) {
    const indentation = " ".repeat(start.column);
    joinSeparator = `,\n${indentation}`;
  }

  const rangeStart = elements?.at(0)?.range?.at(0);
  const rangeEnd = elements?.at(-1)?.range?.at(-1);
  if (rangeStart === undefined || rangeEnd === undefined) return null;
  const fixedText = sortedElements.join(joinSeparator);
  return fixer.replaceTextRange([rangeStart, rangeEnd], fixedText);
};
