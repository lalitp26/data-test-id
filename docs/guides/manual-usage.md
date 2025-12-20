# Manual Usage Guide - libDataTestId

Complete guide for using the `libDataTestId` directive to manually assign data-testid attributes.

## Basic Usage

```html
<button libDataTestId="submit-btn">Submit</button>
```

Results in:
```html
<button data-testid="submit-btn">Submit</button>
```

## All Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `libDataTestId` | `string \| null` | `null` | The data-testid value |
| `libDataTestIdPrefix` | `string \| null` | `null` | Prefix prepended to the ID |
| `libDataTestIdSuffix` | `string \| null` | `null` | Suffix appended to the ID |
| `developmentMode` | `boolean` | `false` | Only apply in dev mode |
| `validate` | `boolean` | `true` | Enable format validation |

## Examples

### With Prefix

```html
<form>
  <input 
    libDataTestId="email"
    [libDataTestIdPrefix]="'login-form'" />
  <!-- Result: data-testid="login-form-email" -->
  
  <button 
    libDataTestId="submit"
    [libDataTestIdPrefix]="'login-form'">
    Login
  </button>
  <!-- Result: data-testid="login-form-submit" -->
</form>
```

### With Suffix

```html
<button 
  libDataTestId="save"
  [libDataTestIdSuffix]="'btn'">
  Save
</button>
<!-- Result: data-testid="save-btn" -->
```

### Development Mode Only

```html
<div 
  libDataTestId="debug-panel"
  [developmentMode]="true">
  <!-- Only in development, removed in production -->
</div>
```

### Disable Validation

```html
<button 
  libDataTestId="my_custom_id"
  [validate]="false">
  <!-- Validation disabled, allows any format -->
</button>
```

### Dynamic IDs

```html
<div *ngFor="let item of items">
  <span [libDataTestId]="'item-' + item.id + '-name'">
    {{ item.name }}
  </span>
  <button [libDataTestId]="'item-' + item.id + '-delete-btn'">
    Delete
  </button>
</div>
```

### Component-Level Prefix

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <div [libDataTestIdPrefix]="testIdPrefix">
      <h3 libDataTestId="name">{{ user.name }}</h3>
      <p libDataTestId="email">{{ user.email }}</p>
      <button libDataTestId="edit-btn">Edit</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() testIdPrefix = 'user-card';
}
```

## Validation Rules

When `validate="true"` (default), IDs must:
- Use kebab-case (lowercase with hyphens)
- Start with a letter
- Contain only letters, numbers, and hyphens
- Not have consecutive hyphens
- Not start or end with hyphens

**Valid:**
- ✅ `submit-btn`
- ✅ `user-profile-card`
- ✅ `item-123-name`

**Invalid:**
- ❌ `SubmitBtn` (camelCase)
- ❌ `submit_btn` (underscores)
- ❌ `submit--btn` (consecutive hyphens)
- ❌ `-submit-btn` (starts with hyphen)

## Best Practices

See the [Best Practices Guide](best-practices.md) for detailed recommendations.

---

Next: [Auto Generation Guide](auto-generation.md)
