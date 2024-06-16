import {RuleContext} from '@typescript-eslint/utils/dist/ts-eslint';

export interface RuleOptions {
  reverseSort: boolean;
  extraDecorators: Array<string>;
  extraProperties: Array<string>;
}

export type DecoratorArrayItemsRuleContext = RuleContext<
  'wrongOrderOfDecoratorArrayItems',
  Array<Partial<RuleOptions>>
>;
