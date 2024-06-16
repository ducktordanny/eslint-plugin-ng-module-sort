import {RuleTester} from '@typescript-eslint/utils/dist/ts-eslint';
import {decoratorArrayItemsRule} from '../../../lib/rules/decorator-array-items';
import {
  invalidMultilineMock,
  invalidMultipleMultilineMock,
  invalidSingleLineMock,
  validMultilineMock,
  validMultipleMultilineMock,
  validReversedOrderMock,
  validSingleLineMock,
} from './decorator-array-items.mock';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
ruleTester.run('decorator-array-items', decoratorArrayItemsRule, {
  valid: [
    {
      name: 'should be fine in a single line',
      code: validSingleLineMock,
    },
    {
      name: 'should be fine in multiple lines',
      code: validMultilineMock,
    },
    {
      name: 'should be fine in multiple multilines',
      code: validMultipleMultilineMock,
    },
    {
      name: 'should be fine with reversed sort set',
      options: [
        {
          reverseSort: true,
        },
      ],
      code: validReversedOrderMock,
    },
  ],

  invalid: [
    {
      name: 'should sort in a single line',
      code: invalidSingleLineMock,
      output: validSingleLineMock,
      errors: [
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'imports'},
        },
      ],
    },

    {
      name: 'should sort multiple lines keeping indentation',
      code: invalidMultilineMock,
      output: validMultilineMock,
      errors: [
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'imports'},
        },
      ],
    },

    {
      name: 'should sort multiple multilines with keeping indentations',
      code: invalidMultipleMultilineMock,
      output: validMultipleMultilineMock,
      errors: [
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'imports'},
        },
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'providers'},
        },
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'declarations'},
        },
        {
          messageId: 'wrongOrderOfDecoratorArrayItems',
          data: {property: 'exports'},
        },
      ],
    },
  ],
});
