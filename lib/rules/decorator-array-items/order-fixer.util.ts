import {TSESLint, TSESTree} from '@typescript-eslint/utils';

import {DecoratorArrayItemsRuleContext} from '../../types';

export const orderFixer = (
  fixer: TSESLint.RuleFixer,
  context: DecoratorArrayItemsRuleContext,
  node: TSESTree.ArrayExpression,
  reverseSort: boolean,
): TSESLint.RuleFix | null => {
  const sourceCode = context.sourceCode;
  const elements = node.elements as Array<TSESTree.Identifier>;
  const sortedElements = elements.map((el) => sourceCode.getText(el)).sort();
  if (reverseSort) sortedElements.reverse();

  let joinSeparator = ', ';
  const start = elements?.at(0)?.loc?.start;
  const end = elements?.at(-1)?.loc?.start;
  if (start && end && start.line !== end.line) {
    const indentation = ' '.repeat(start.column);
    joinSeparator = `,\n${indentation}`;
  }

  const rangeStart = elements?.at(0)?.range?.at(0);
  const rangeEnd = elements?.at(-1)?.range?.at(-1);
  if (rangeStart === undefined || rangeEnd === undefined) return null;
  const fixedText = sortedElements.join(joinSeparator);
  return fixer.replaceTextRange([rangeStart, rangeEnd], fixedText);
};
