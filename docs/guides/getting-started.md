# Getting Started with ngx-data-test-id

Welcome! This guide will help you install and set up ngx-data-test-id in your Angular application.

## Installation

### Using npm

```bash
npm install ngx-data-test-id
```

### Using yarn

```bash
yarn add ngx-data-test-id
```

### Using pnpm

```bash
pnpm add ngx-data-test-id
```

## Compatibility

| Angular Version | ngx-data-test-id | Status |
|----------------|-------------------|---------|
| 18.x | 1.x.x | ✅ Supported |
| 19.x | 1.x.x | ✅ Supported |
| 20.x | 1.x.x | ✅ Supported |

## Setup

### For Standalone Components (Recommended)

If you're using Angular 14+ with standalone components:

```typescript
import { Component } from '@angular/core';
import { DataTestIdDirective } from 'ngx-data-test-id';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DataTestIdDirective], // Import the directive
  template: `
    <h1>My App</h1>
    <button libDataTestId="welcome-btn">Click Me</button>
  `
})
export class AppComponent {}
```

### For Module-Based Applications (Legacy)

If you're using NgModules:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDataTestIdModule } from 'ngx-data-test-id';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxDataTestIdModule // Import the module
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Then use in your template:

```html
<button libDataTestId="welcome-btn">Click Me</button>
```

## Your First Data Test ID

### Manual Assignment

The simplest way to add a data-testid:

```html
<button libDataTestId="submit-button">Submit</button>
```

This will render as:

```html
<button data-testid="submit-button">Submit</button>
```

### Automatic Generation

Let the library generate the ID for you:

```html
<button libAutoDataTestId>Submit</button>
```

This might render as:

```html
<button data-testid="button-submit">Submit</button>
```

## Basic Examples

### Login Form

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTestIdDirective } from 'ngx-data-test-id';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, DataTestIdDirective],
  template: `
    <form>
      <input 
        libDataTestId="username-input"
        [(ngModel)]="username"
        placeholder="Username" />
      
      <input 
        libDataTestId="password-input"
        [(ngModel)]="password"
        type="password"
        placeholder="Password" />
      
      <button libDataTestId="login-button">
        Login
      </button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
}
```

### Using in Tests

With Cypress:

```javascript
cy.get('[data-testid="username-input"]').type('john');
cy.get('[data-testid="password-input"]').type('secret');
cy.get('[data-testid="login-button"]').click();
```

With Playwright:

```javascript
await page.getByTestId('username-input').fill('john');
await page.getByTestId('password-input').fill('secret');
await page.getByTestId('login-button').click();
```

With Testing Library:

```javascript
const usernameInput = screen.getByTestId('username-input');
const passwordInput = screen.getByTestId('password-input');
const loginButton = screen.getByTestId('login-button');
```

## Development Mode Only

Want data-testids only in development? Use the `developmentMode` input:

```html
<div 
  libDataTestId="debug-panel"
  [developmentMode]="true">
  <!-- Only has data-testid in dev, removed in production -->
</div>
```

## Using Prefixes

Group related elements with a prefix:

```html
<form>
  <input 
    libDataTestId="email"
    [libDataTestIdPrefix]="'login-form'" />
  <!-- Results in: data-testid="login-form-email" -->
  
  <input 
    libDataTestId="password"
    [libDataTestIdPrefix]="'login-form'" />
  <!-- Results in: data-testid="login-form-password" -->
</form>
```

## Configuration Options

The library works out of the box with sensible defaults. For advanced configuration, see:

- [Manual Usage Guide](manual-usage.md) - All options for `libDataTestId`
- [Auto Generation Guide](auto-generation.md) - How automatic generation works
- [Best Practices](best-practices.md) - Recommended patterns

## Next Steps

- ✅ [Manual Usage Guide](manual-usage.md) - Deep dive into manual directives
- ✅ [Auto Generation Guide](auto-generation.md) - Understanding automatic generation
- ✅ [Best Practices](best-practices.md) - Writing good data-testids
- ✅ [API Reference](../API.md) - Complete API documentation
- ✅ [Troubleshooting](troubleshooting.md) - Common issues and solutions

## Quick Reference

| Directive | Usage | When to Use |
|-----------|-------|-------------|
| `libDataTestId` | `<button libDataTestId="my-btn">` | When you want full control over the ID |
| `libAutoDataTestId` | `<button libAutoDataTestId>` | For quick setup on existing elements |

## Need Help?

- 📖 [Full Documentation](../README.md)
- 💬 [GitHub Discussions](https://github.com/ngx-data-test-id/ngx-data-test-id/discussions)
- 🐛 [Report an Issue](https://github.com/ngx-data-test-id/ngx-data-test-id/issues)

---

Happy testing! 🧪
