# Best Practices for Data Test IDs

This guide covers recommended patterns and practices for using ngx-data-test-id effectively.

## Naming Conventions

### Use Kebab-Case

```html
<!-- ✅ Good -->
<button libDataTestId="submit-button">Submit</button>
<input libDataTestId="email-input" />
<div libDataTestId="user-profile-card"></div>

<!-- ❌ Bad -->
<button libDataTestId="submitButton">Submit</button>    <!-- camelCase -->
<button libDataTestId="submit_button">Submit</button>   <!-- snake_case -->
<button libDataTestId="SUBMIT-BUTTON">Submit</button>   <!-- UPPERCASE -->
```

### Be Descriptive

```html
<!-- ✅ Good - Clear purpose -->
<button libDataTestId="login-submit-button">Login</button>
<input libDataTestId="username-input" />
<div libDataTestId="error-message-container"></div>

<!-- ❌ Bad - Too vague -->
<button libDataTestId="btn">Login</button>
<input libDataTestId="input1" />
<div libDataTestId="container"></div>
```

### Include Element Type

```html
<!-- ✅ Good - Includes type suffix -->
<button libDataTestId="submit-btn">Submit</button>
<input libDataTestId="email-input" />
<div libDataTestId="modal-dialog"></div>
<span libDataTestId="error-message"></span>

<!-- ❌ Bad - Type unclear -->
<button libDataTestId="submit">Submit</button>
<input libDataTestId="email" />
```

### Use Context/Hierarchy

```html
<!-- ✅ Good - Shows hierarchy -->
<form libDataTestId="login-form">
  <input libDataTestId="login-form-username-input" />
  <input libDataTestId="login-form-password-input" />
  <button libDataTestId="login-form-submit-btn">Login</button>
</form>

<!-- Or use prefix for cleaner templates -->
<form>
  <input 
    libDataTestId="username-input"
    [libDataTestIdPrefix]="'login-form'" />
  <input 
    libDataTestId="password-input"
    [libDataTestIdPrefix]="'login-form'" />
  <button 
    libDataTestId="submit-btn"
    [libDataTestIdPrefix]="'login-form'">
    Login
  </button>
</form>
```

## When to Use Manual vs Auto

### Use Manual (`libDataTestId`) When:

✅ **Critical user actions**
```html
<button libDataTestId="checkout-confirm-btn">Confirm Purchase</button>
<button libDataTestId="delete-account-btn">Delete Account</button>
```

✅ **Forms and inputs**
```html
<input libDataTestId="credit-card-number-input" />
<select libDataTestId="country-select"></select>
```

✅ **Navigation elements**
```html
<nav>
  <a libDataTestId="nav-home-link">Home</a>
  <a libDataTestId="nav-profile-link">Profile</a>
  <a libDataTestId="nav-settings-link">Settings</a>
</nav>
```

✅ **Dynamic content that needs consistent IDs**
```html
<div *ngFor="let item of items">
  <span [libDataTestId]="'item-' + item.id + '-name'">
    {{ item.name }}
  </span>
</div>
```

### Use Auto (`libAutoDataTestId`) When:

✅ **Retrofitting large legacy codebases**
```html
<!-- Quick way to add testids to existing app -->
<button libAutoDataTestId>Submit</button>
```

✅ **Non-critical UI elements**
```html
<div libAutoDataTestId>Decorative container</div>
```

✅ **Prototyping/development**
```html
<!-- Use auto during development, replace with manual for important elements -->
<button libAutoDataTestId>Temporary Button</button>
```

## Organization Strategies

### Strategy 1: Prefix by Feature

```html
<!-- User Profile Feature -->
<div libDataTestIdPrefix="user-profile">
  <img libDataTestId="avatar-img" />
  <h2 libDataTestId="name-heading"></h2>
  <button libDataTestId="edit-btn">Edit</button>
</div>

<!-- Results in:
  - user-profile-avatar-img
  - user-profile-name-heading
  - user-profile-edit-btn
-->
```

### Strategy 2: Prefix by Page/Route

```html
<!-- Dashboard Page -->
<div libDataTestIdPrefix="dashboard">
  <h1 libDataTestId="title">Dashboard</h1>
  <div libDataTestId="stats-card"></div>
</div>

<!-- Settings Page -->
<div libDataTestIdPrefix="settings">
  <h1 libDataTestId="title">Settings</h1>
  <form libDataTestId="preferences-form"></form>
</div>
```

### Strategy 3: Component-Based

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
  @Input() user!: User;
  @Input() testIdPrefix = 'user-card';
}
```

```html
<!-- Usage -->
<app-user-card 
  [user]="currentUser"
  testIdPrefix="profile-user-card">
</app-user-card>
```

## Performance Considerations

### Only Apply What You Need

```html
<!-- ❌ Bad - Every element has testid -->
<div libAutoDataTestId>
  <div libAutoDataTestId>
    <span libAutoDataTestId>Text</span>
    <span libAutoDataTestId>More text</span>
  </div>
</div>

<!-- ✅ Good - Only testable elements -->
<div>
  <div>
    <span>Text</span>
    <button libDataTestId="action-btn">Click</button>
  </div>
</div>
```

### Use Development Mode for Debug Elements

```html
<!-- Only in development builds -->
<div 
  libDataTestId="debug-panel"
  [developmentMode]="true">
  Debug info here
</div>
```

### Disable Validation in Production

```html
<!-- Validation only needed during development -->
<button 
  libDataTestId="submit-btn"
  [validate]="!environment.production">
</button>
```

## Testing Patterns

### Page Object Pattern

```typescript
// login.page.ts
export class LoginPage {
  get usernameInput() {
    return cy.get('[data-testid="login-form-username-input"]');
  }
  
  get passwordInput() {
    return cy.get('[data-testid="login-form-password-input"]');
  }
  
  get submitButton() {
    return cy.get('[data-testid="login-form-submit-btn"]');
  }
  
  login(username: string, password: string) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
  }
}

// Usage in tests
const loginPage = new LoginPage();
loginPage.login('user@example.com', 'password');
```

### Component Testing

```typescript
// user-card.component.spec.ts
it('should display user information', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  fixture.componentInstance.user = mockUser;
  fixture.detectChanges();
  
  const nameElement = fixture.nativeElement.querySelector(
    '[data-testid="user-card-name"]'
  );
  expect(nameElement.textContent).toBe('John Doe');
});
```

## Common Patterns

### Lists and Repeated Items

```html
<!-- ✅ Good - Unique IDs for each item -->
<ul>
  <li *ngFor="let user of users; let i = index">
    <span [libDataTestId]="'user-item-' + i + '-name'">
      {{ user.name }}
    </span>
    <button [libDataTestId]="'user-item-' + i + '-delete-btn'">
      Delete
    </button>
  </li>
</ul>

<!-- Or use item ID if available -->
<ul>
  <li *ngFor="let user of users">
    <span [libDataTestId]="'user-' + user.id + '-name'">
      {{ user.name }}
    </span>
  </li>
</ul>
```

### Conditional Elements

```html
<!-- ✅ Good - Same testid regardless of condition -->
<div *ngIf="isLoading; else content">
  <span libDataTestId="loading-spinner">Loading...</span>
</div>
<ng-template #content>
  <div libDataTestId="content-container">
    Content here
  </div>
</ng-template>
```

### Modals and Dialogs

```html
<div libDataTestId="confirmation-modal">
  <h2 libDataTestId="confirmation-modal-title">Confirm Action</h2>
  <p libDataTestId="confirmation-modal-message">Are you sure?</p>
  <button libDataTestId="confirmation-modal-cancel-btn">Cancel</button>
  <button libDataTestId="confirmation-modal-confirm-btn">Confirm</button>
</div>
```

### Form Validation Messages

```html
<input libDataTestId="email-input" />
<span 
  *ngIf="emailInvalid"
  libDataTestId="email-error-message">
  Invalid email address
</span>
```

## Anti-Patterns to Avoid

### ❌ Using Indexes as Primary Identifier

```html
<!-- Bad - Index can change -->
<div *ngFor="let item of items; let i = index">
  <span [libDataTestId]="'item-' + i">{{ item.name }}</span>
</div>

<!-- Good - Use stable ID -->
<div *ngFor="let item of items">
  <span [libDataTestId]="'item-' + item.id">{{ item.name }}</span>
</div>
```

### ❌ Too Generic Names

```html
<!-- Bad -->
<button libDataTestId="button1">Click</button>
<div libDataTestId="container"></div>

<!-- Good -->
<button libDataTestId="save-profile-btn">Click</button>
<div libDataTestId="profile-details-container"></div>
```

### ❌ Mixing Naming Conventions

```html
<!-- Bad - Inconsistent -->
<button libDataTestId="submitButton">Submit</button>
<input libDataTestId="email_input" />
<div libDataTestId="user-card"></div>

<!-- Good - Consistent kebab-case -->
<button libDataTestId="submit-button">Submit</button>
<input libDataTestId="email-input" />
<div libDataTestId="user-card"></div>
```

### ❌ Overly Long IDs

```html
<!-- Bad - Too long -->
<button libDataTestId="user-profile-settings-page-account-section-email-preferences-save-button">
  Save
</button>

<!-- Good - Concise with context -->
<button 
  libDataTestId="save-btn"
  [libDataTestIdPrefix]="'email-preferences'">
  Save
</button>
```

## Documentation

### Document Your Strategy

Create a team guide:

```markdown
## Data TestID Strategy

### Naming Convention
- Use kebab-case
- Format: `{feature}-{element}-{type}`
- Example: `login-form-submit-btn`

### Prefixes
- `dashboard-*` - Dashboard page elements
- `profile-*` - User profile elements
- `settings-*` - Settings page elements

### Required TestIDs
- All buttons that trigger actions
- All form inputs
- All navigation links
- Error messages
- Loading states
```

## Summary

**Do:**
- ✅ Use kebab-case
- ✅ Be descriptive and consistent
- ✅ Use manual IDs for critical elements
- ✅ Use prefixes for organization
- ✅ Document your strategy

**Don't:**
- ❌ Use generic names
- ❌ Mix naming conventions
- ❌ Add testids to every element
- ❌ Use unstable identifiers (indexes)
- ❌ Make IDs too long

---

Following these practices will make your tests more maintainable and your codebase easier to work with! 🎯
