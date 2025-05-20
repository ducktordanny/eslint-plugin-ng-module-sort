export const validSingleLineMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
}) export class TestComponent {}`;

export const invalidSingleLineMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
}) export class TestComponent {}`;

export const validMultilineMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
}) export class TestComponent {}`;

export const invalidMultilineMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
}) export class TestComponent {}`;

export const validMultipleMultilineMock = `@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TestStandaloneComponent,
  ],
  providers: [
    AppleService,
    SomethingService,
    TestService,
    UserStore,
  ],
  declarations: [
    AppComponent,
    ToArrayPipe,
    WorkshopPageComponent,
  ],
  exports: [
    ToArrayPipe,
    WorkshopPageComponent,
  ],
}) export class TestModule {}`;

export const invalidMultipleMultilineMock = `@NgModule({
  imports: [
    RouterModule,
    TestStandaloneComponent,
    CommonModule,
  ],
  providers: [
    TestService,
    SomethingService,
    AppleService,
    UserStore,
  ],
  declarations: [
    ToArrayPipe,
    AppComponent,
    WorkshopPageComponent,
  ],
  exports: [
    WorkshopPageComponent,
    ToArrayPipe,
  ],
}) export class TestModule {}`;

export const validReversedOrderMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
  ],
}) export class TestComponent {}`;

export const validExtrasMock = `@SomethingCustomIGuess({
  somethings: [Apple, Doggo, MockedMock, TheModule],
  apples: [
    Catto,
    Mock,
    TranslateModule,
    VolumeModule,
  ],
}) export class CustomTestThingy {}`;

export const invalidExtrasMock = `@SomethingCustomIGuess({
  somethings: [Doggo, Apple, TheModule, MockedMock],
  apples: [
    TranslateModule,
    Catto,
    VolumeModule,
    Mock,
  ],
}) export class CustomTestThingy {}`;

export const validArrayVariableMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: aRandomVariableContainingImports,
}) export class TestComponent {}`;

export const validEmptyArrayMock = `@Component({
  selector: 'app-test',
  template: '',
  standalone: true,
  imports: [],
}) export class TestComponent {}`;
