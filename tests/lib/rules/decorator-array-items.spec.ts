import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';
import { decoratorArrayItemsRule } from '../../../lib/rules/decorator-array-items';

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
ruleTester.run('decorator-array-items', decoratorArrayItemsRule, {
  valid: [
    `
@Component({
selector: 'app-test',
template: '',
standalone: true,
imports: [
CommonModule,
MatButtonModule,
RouterModule,
],
}) export class TestComponent {}
    `,
    `
@NgModule({
imports: [
CommonModule,
RouterModule,
TestStandaloneComponent
],
providers: [
AppleService,
SomethingService,
TestService,
UserStore
],
declarations: [
AppComponent,
ToArrayPipe,
WorkshopPageComponent
],
exports: [
ToArrayPipe,
WorkshopPageComponent
],
}) export class TestModule {}
    `
  ],

  invalid: [
    {
      code: `
@Component({
selector: 'app-test',
template: '',
standalone: true,
imports: [
RouterModule,
CommonModule,
MatButtonModule,
],
}) export class TestComponent {}
      `,
      output: `
@Component({
selector: 'app-test',
template: '',
standalone: true,
imports: [
CommonModule,
MatButtonModule,
RouterModule
],
}) export class TestComponent {}
      `,
      errors: [
        { messageId: 'wrongOrderOfDecoratorArrayItems', data: { property: 'imports' } },
      ],
    },
    {
      code: `
@NgModule({
imports: [
RouterModule,
TestStandaloneComponent,
CommonModule
],
providers: [
TestService,
SomethingService,
AppleService,
UserStore
],
declarations: [
ToArrayPipe,
AppComponent,
WorkshopPageComponent
],
exports: [
WorkshopPageComponent,
ToArrayPipe
],
}) export class TestModule {}
      `,
      output: `
@NgModule({
imports: [
CommonModule,
RouterModule,
TestStandaloneComponent
],
providers: [
AppleService,
SomethingService,
TestService,
UserStore
],
declarations: [
AppComponent,
ToArrayPipe,
WorkshopPageComponent
],
exports: [
ToArrayPipe,
WorkshopPageComponent
],
}) export class TestModule {}
      `,
      errors: [
        { messageId: 'wrongOrderOfDecoratorArrayItems', data: { property: 'imports' } },
        { messageId: 'wrongOrderOfDecoratorArrayItems', data: { property: 'providers' } },
        { messageId: 'wrongOrderOfDecoratorArrayItems', data: { property: 'declarations' } },
        { messageId: 'wrongOrderOfDecoratorArrayItems', data: { property: 'exports' } },
      ],
    },
  ],
});
