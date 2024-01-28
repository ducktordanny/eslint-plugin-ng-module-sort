import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

export type DecoratorArrayItemsRuleContext = RuleContext<
  "wrongOrderOfDecoratorArrayItems",
  Array<{ reverseSort: boolean }>
>;
