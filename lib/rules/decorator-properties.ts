import { RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { getPropertiesOfDecorator, ruleCreator } from "../shared";
import { CallExpression, Decorator, Identifier } from "@typescript-eslint/types/dist/generated/ast-spec";

const checkOrder = (objectKeys: Array<string>, reverseSort: boolean): boolean => {
  const orderedKeys = [...objectKeys].sort();
  if (reverseSort) orderedKeys.reverse();
  return JSON.stringify(objectKeys) === JSON.stringify(orderedKeys);
};

const orderFixer = (fixer: RuleFixer): RuleFix | null => {
  // TODO fixer
  return null;
};

export const decoratorPropertiesRule = ruleCreator({
  name: 'decorator-properties',
  meta: {
    type: 'layout',
    docs: {
      description: 'Checks if the Angular or NestJS module related metadata has ordered properties, and provide an autofix to sort them.',
      recommended: 'error',
    },
    messages: {
      wrongOrderOfDecoratorProperties: 'Run `eslint --fix .` to sort the members of properties in {{ decoratorName }}.',
    },
    fixable: 'code',
    schema: [
      { reverseSort: false },
    ],
  },

  create(context): RuleListener {
    const reverseSort = context?.options?.[0]?.['reverseSort'] as boolean;

    return {
      Decorator(node: Decorator): void {
        const properties = getPropertiesOfDecorator(node);

        const objectKeys = properties?.map(prop => (prop?.key as Identifier)?.name as string);
        if (!objectKeys) return;
        const isOrdered = checkOrder(objectKeys, reverseSort);
        if (isOrdered) return;
        const callExp = node?.expression as CallExpression;
        const decoratorName = (callExp?.callee as Identifier)?.name;

        context.report({
          node,
          messageId: 'wrongOrderOfDecoratorProperties',
          data: {
            decoratorName,
          },
          fix: (fixer) => orderFixer(fixer),
        });
      },
    };
  },

  defaultOptions: [],
});
