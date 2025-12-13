import {RuleContext} from '@typescript-eslint/utils/ts-eslint';

export interface RuleSettings {
  reverseSort: boolean;
  extraDecorators: Array<string>;
  extraProperties: Array<string>;
}
export type RuleOptions = Partial<RuleSettings>;

export type DecoratorArrayItemsRuleContext = RuleContext<
  'wrongOrderOfDecoratorArrayItems',
  Array<Partial<RuleOptions>>
>;
