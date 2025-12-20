# Auto Generation Guide - libAutoDataTestId

Complete guide for using the `libAutoDataTestId` directive for automatic data-testid generation.

## Basic Usage

```html
<button libAutoDataTestId>Submit</button>
```

Automatically generates:
```html
<button data-testid="button-submit">Submit</button>
```

## How It Works

The directive analyzes the element and generates an ID based on:
1. Element tag name (`button`, `input`, `div`, etc.)
2. Text content
3. Element attributes (`type`, `aria-label`, etc.)
4. Form context (for form elements)
5. Semantic attributes (`role`, `name`, etc.)

## Generation Examples

### Buttons

```html
<button libAutoDataTestId>Save</button>
<!-- Generated: data-testid="button-save" -->

<button libAutoDataTestId aria-label="Close dialog">×</button>
<!-- Generated: data-testid="button-close-dialog" -->
```

### Inputs

```html
<input libAutoDataTestId type="email" placeholder="Email" />
<!-- Generated: data-testid="input-email" -->

<input libAutoDataTestId name="username" />
<!-- Generated: data-testid="input-username" -->
```

### Links

```html
<a libAutoDataTestId href="/profile">View Profile</a>
<!-- Generated: data-testid="link-view-profile" -->
```

### Form Elements

```html
<select libAutoDataTestId name="country">
  <option>USA</option>
</select>
<!-- Generated: data-testid="select-country" -->

<textarea libAutoDataTestId placeholder="Comments"></textarea>
<!-- Generated: data-testid="textarea-comments" -->
```

## Selector

The directive automatically applies to:
- `button:not([data-testid])`
- `input:not([data-testid])`
- `textarea:not([data-testid])`
- `select:not([data-testid])`
- `a:not([data-testid])`
- `[role="button"]:not([data-testid])`
- `[libAutoDataTestId]` (explicit)

## With Prefix

```html
<div [libDataTestIdPrefix]="'login-form'">
  <button libAutoDataTestId>Submit</button>
  <!-- Generated: data-testid="login-form-button-submit" -->
  
  <input libAutoDataTestId type="email" />
  <!-- Generated: data-testid="login-form-input-email" -->
</div>
```

## Strategies (Coming Soon)

Future versions will support custom generation strategies:

```html
<button 
  libAutoDataTestId 
  strategy="semantic">
  Submit
</button>
```

## Fallback Behavior

If the directive cannot generate a meaningful ID:
```html
<button libAutoDataTestId></button>
<!-- Fallback: data-testid="button-12345678" (timestamp) -->
```

## When to Use Auto vs Manual

### Use Auto When:
- ✅ Retrofitting large legacy applications
- ✅ Prototyping/rapid development
- ✅ Non-critical UI elements
- ✅ Consistent element patterns

### Use Manual When:
- ✅ Critical user flows
- ✅ Complex forms
- ✅ Dynamic content with specific IDs needed
- ✅ You need precise control

## Combining Auto and Manual

```html
<form>
  <!-- Manual for important fields -->
  <input libDataTestId="username-input" />
  <input libDataTestId="password-input" />
  
  <!-- Auto for less critical elements -->
  <button libAutoDataTestId>Forgot Password?</button>
  <a libAutoDataTestId href="/help">Need Help?</a>
</form>
```

## Migration Path

Start with auto, replace with manual for important elements:

**Phase 1: Add auto everywhere**
```html
<form>
  <input libAutoDataTestId type="email" />
  <button libAutoDataTestId>Submit</button>
</form>
```

**Phase 2: Replace critical elements**
```html
<form>
  <input libDataTestId="email-input" type="email" />
  <button libDataTestId="submit-btn">Submit</button>
</form>
```

## Limitations

- Generated IDs may change if element content/attributes change
- Not suitable for elements requiring stable IDs across deployments
- May generate verbose IDs for complex elements

## Best Practices

1. **Use for initial setup**, replace with manual for critical paths
2. **Document generated IDs** in page objects
3. **Monitor for changes** when updating templates
4. **Combine with prefixes** for organization

---

Next: [Best Practices Guide](best-practices.md)
