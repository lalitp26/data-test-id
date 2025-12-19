# API Reference

## Directives

### libDataTestId

Manually set data-testid attribute on elements.

**Selector:** `[libDataTestId]`

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| libDataTestId | `string \| null` | `null` | Data test ID value |
| libDataTestIdPrefix | `string \| null` | `null` | Prefix for the ID |
| libDataTestIdSuffix | `string \| null` | `null` | Suffix for the ID |
| developmentMode | `boolean` | `false` | Enable in production |
| validate | `boolean` | `true` | Enable validation |

#### Usage

```html
<!-- Basic usage -->
<button libDataTestId="submit-btn">Submit</button>

<!-- With prefix -->
<input libDataTestId="email" libDataTestIdPrefix="form">
<!-- Results in: data-testid="form-email" -->

<!-- Disable validation -->
<div libDataTestId="container" [validate]="false">
```

#### Examples

**Login Form:**
```html
<form>
  <input libDataTestId="username-input" />
  <input libDataTestId="password-input" />
  <button libDataTestId="login-btn">Login</button>
</form>
```

---

### libAutoDataTestId

Automatically generate data-testid based on element context.

**Selector:** `[libAutoDataTestId]`

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| strategy | `'default' \| 'semantic' \| 'form'` | `'default'` | Generation strategy |
| prefix | `string \| null` | `null` | Prefix for generated ID |

#### Usage

```html
<!-- Automatic generation -->
<button libAutoDataTestId>Click Me</button>
<!-- Generates: data-testid="button-click-me" -->

<!-- Custom strategy -->
<input libAutoDataTestId strategy="form" />
<!-- Generates based on form context -->
```

## Services

### DataTestIdService

Manage data-testid registration and validation.

#### Methods

##### `registerDataTestId(id: string, element: HTMLElement): void`
Register a data-testid to detect duplicates.

##### `unregisterDataTestId(id: string, element: HTMLElement): void`
Remove registration when element is destroyed.

##### `validateFormat(id: string): boolean`
Check if ID follows naming conventions.

#### Usage

```typescript
export class MyComponent {
  private dataTestIdService = inject(DataTestIdService);
  
  ngOnInit() {
    const isValid = this.dataTestIdService.validateFormat('my-button');
  }
}
```
