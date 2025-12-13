import {TSESTree} from '@typescript-eslint/utils';

import {DecoratorArrayItemsRuleContext} from '../../types';

export const orderCheck = (
  context: DecoratorArrayItemsRuleContext,
  elements: Array<TSESTree.Identifier>,
  reverseSort: boolean,
): boolean => {
  const sourceCode = context.sourceCode;
  const elementNames = elements.map((el) => sourceCode.getText(el));
  const orderedElementNames = [...elementNames].sort();
  if (reverseSort) orderedElementNames.reverse();
  return JSON.stringify(elementNames) === JSON.stringify(orderedElementNames);
};
