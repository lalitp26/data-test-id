# ngx-data-test-id

> Automated and manual data-testid management for Angular applications

[![npm version](https://img.shields.io/npm/v/ngx-data-test-id)](https://www.npmjs.com/package/ngx-data-test-id)
[![Build Status](https://github.com/username/ngx-data-test-id/workflows/CI/badge.svg)](https://github.com/username/ngx-data-test-id/actions)
[![License: MIT](https://img.shields.io/npm/l/ngx-data-test-id)](./LICENSE)

## Why?

QA teams need `data-testid` attributes on HTML elements for automated testing. Adding them manually to large legacy applications is time-consuming and error-prone. This library provides both manual and automatic solutions with consistent naming conventions.

## ✨ Features

- ✅ **Manual directive** with consistent naming conventions
- ✅ **Automatic generation** based on element context
- ✅ **Validation** and duplicate detection
- ✅ **TypeScript** support with full type safety
- ✅ **Angular 18+** compatible (supports 18, 19, 20)
- ✅ **Zero dependencies** - lightweight and fast

## 📦 Installation

```bash
npm install ngx-data-test-id
```

## 🚀 Quick Start

### Standalone Component (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { DataTestIdDirective } from 'ngx-data-test-id';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DataTestIdDirective],
  template: `
    <!-- Manual: You control the ID -->
    <button libDataTestId="login-btn">Login</button>
    <input libDataTestId="username-input" placeholder="Username" />
    
    <!-- Automatic: Generated based on context -->
    <button libAutoDataTestId>Submit</button>
  `
})
export class LoginComponent {}
```

### Module-Based (Legacy)

```typescript
import { NgModule } from '@angular/core';
import { NgxDataTestIdModule } from 'ngx-data-test-id';

@NgModule({
  imports: [NgxDataTestIdModule],
  // ...
})
export class AppModule {}
```

## 📚 Documentation

### For Users
- 📖 [Getting Started](docs/guides/getting-started.md) - Installation and basic setup
- 📝 [Manual Usage Guide](docs/guides/manual-usage.md) - Using `libDataTestId` directive
- 🤖 [Auto Generation Guide](docs/guides/auto-generation.md) - Using `libAutoDataTestId` directive
- ⭐ [Best Practices](docs/guides/best-practices.md) - Recommended patterns
- 🔧 [Troubleshooting](docs/guides/troubleshooting.md) - Common issues and solutions
- 📚 [API Reference](docs/API.md) - Complete API documentation

### For Maintainers
- 🏗️ [Architecture](docs/ARCHITECTURE.md) - Internal design and decisions
- 📛 [Naming Conventions](docs/NAMING-CONVENTIONS.md) - Coding standards
- 📊 [Version Planning](docs/VERSION-PLANNING.md) - Semantic versioning strategy
- 🔄 [Maintaining Versions](docs/MAINTAINING-VERSIONS.md) - Branch strategy and backporting
- 🚀 [Release Process](docs/RELEASE-PROCESS.md) - How to release new versions
- 📦 [NPM Publishing](docs/NPM-PUBLISHING.md) - Publishing to NPM registry
- 🔄 [Migration Guides](docs/MIGRATION.md) - Upgrade guides for major versions

## 🔄 Compatibility

| ngx-data-test-id | Angular     | Status     | Support Ends       |
|------------------|-------------|------------|--------------------|
| 1.x.x            | 18, 19, 20  | ✅ Active  | 6 months after 2.0 |
| 2.x.x            | 19, 20, 21  | 🔮 Future  | TBD                |

## 💡 Examples

### With Prefix

```html
<form>
  <input 
    libDataTestId="email" 
    [libDataTestIdPrefix]="'login-form'" 
    type="email" />
  <!-- Results in: data-testid="login-form-email" -->
</form>
```

### Validation

```html
<button 
  libDataTestId="submit-btn"
  [validate]="true">
  <!-- Validates kebab-case format -->
</button>
```

### Development Mode Only

```html
<div 
  libDataTestId="debug-panel"
  [developmentMode]="true">
  <!-- Only applied in development, removed in production -->
</div>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © ngx-data-test-id contributors

## 🐛 Found a Bug?

Please [open an issue](https://github.com/username/ngx-data-test-id/issues/new?template=bug_report.md) with details.

## 💬 Questions?

- 📖 Check the [documentation](docs/)
- 💬 [GitHub Discussions](https://github.com/username/ngx-data-test-id/discussions)
- 🏷️ [Stack Overflow](https://stackoverflow.com/questions/tagged/ngx-data-test-id) with tag `ngx-data-test-id`

---

**Built with ❤️ for QA teams and developers**
