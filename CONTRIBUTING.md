# Contributing to ngx-data-test-id

First off, thank you for considering contributing to ngx-data-test-id! 🎉

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something useful together.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Version** of the library
- **Angular version**
- **Clear description** of the problem
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Code sample** (minimal reproduction)
- **Error messages** (if any)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing issues** first
- **Explain the use case** clearly
- **Describe the solution** you envision
- **Consider alternatives**

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Pull Requests

1. **Fork** the repo
2. **Create a branch** from `develop`
   ```bash
   git checkout develop
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow our [coding standards](#coding-standards)
   - Write tests
   - Update documentation
4. **Commit** your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **Push** to your fork
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** to `develop` branch

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic Angular knowledge

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/ngx-data-test-id.git
cd ngx-data-test-id

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

### Project Structure

```
ngx-data-test-id/
├── projects/
│   └── ngx-data-test-id/
│       └── src/
│           ├── lib/
│           │   ├── directives/    # Directive implementations
│           │   ├── services/      # Services
│           │   ├── strategies/    # Generation strategies
│           │   ├── models/        # Interfaces and types
│           │   └── utils/         # Helper functions
│           └── public-api.ts      # Public exports
├── docs/                          # Documentation
└── README.md
```

## Coding Standards

### File Naming

- **Kebab-case**: `data-test-id.directive.ts`
- **Type suffix**: `.directive.ts`, `.service.ts`, `.spec.ts`
- **Test files**: Same name with `.spec.ts`

See [NAMING-CONVENTIONS.md](docs/NAMING-CONVENTIONS.md) for complete guide.

### TypeScript

- **Use TypeScript strict mode**
- **No `any` types** (use `unknown` if needed)
- **Explicit return types** on public methods
- **Modern ES features** are encouraged

### Angular

- **Use signal inputs** (Angular 17+)
- **Use `inject()` function** for DI
- **Standalone directives** (no NgModule unless needed for compatibility)
- **Follow Angular style guide**

### Code Style

```typescript
// ✅ Good
export class DataTestIdDirective implements OnInit {
  public readonly libDataTestId = input<string | null>(null);
  
  private readonly element = inject(ElementRef);
  
  ngOnInit(): void {
    const id = this.resolveDataTestId();
    if (id) {
      this.setDataTestIdAttribute(id);
    }
  }
  
  private resolveDataTestId(): string | null {
    // Implementation
    return null;
  }
}

// ❌ Bad
export class DataTestIdDirective {
  @Input() libDataTestId: any; // No 'any', use decorators for old Angular only
  
  constructor(private el: ElementRef) {} // Use inject() instead
  
  ngOnInit() { // Missing return type
    var id = this.resolve(); // Use const/let, not var
  }
}
```

## Testing

### Writing Tests

- **Test all public APIs**
- **Test edge cases**
- **Use descriptive test names**
- **Keep tests simple and focused**

```typescript
describe('DataTestIdDirective', () => {
  describe('ngOnInit', () => {
    it('should generate data-testid when not provided', () => {
      // Arrange
      // Act
      // Assert
    });
    
    it('should use provided data-testid', () => {
      // Test
    });
    
    it('should apply prefix when specified', () => {
      // Test
    });
  });
});
```

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Coverage Requirements

- **Overall**: > 80%
- **Critical code** (directives, services): 100%
- **Edge cases**: Cover all error scenarios

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style (formatting, missing semi-colons)
- **refactor**: Code refactoring
- **test**: Adding/updating tests
- **chore**: Maintenance (dependencies, build)
- **perf**: Performance improvement

### Examples

```bash
feat(directive): add support for prefix and suffix
fix(service): resolve memory leak in registration
docs(readme): update installation instructions
test(directive): add tests for validation
chore(deps): update Angular to v19
```

### Scope (Optional)

- `directive` - Directive changes
- `service` - Service changes
- `strategy` - Strategy changes
- `docs` - Documentation
- `build` - Build system
- `ci` - CI/CD

## Documentation

- **Update docs** when adding features
- **Add JSDoc comments** to public APIs
- **Update README** if needed
- **Add examples** for new features

## Pull Request Process

1. **Ensure tests pass** and coverage is maintained
2. **Update documentation** if needed
3. **Add changelog entry** in CHANGELOG.md under `[Unreleased]`
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** if requested

### PR Title Format

Use conventional commit format:
```
feat: add custom strategy API
fix: resolve button data-testid issue
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added tests
- [ ] All tests pass
- [ ] Tested manually in Angular 18/19/20

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console.log statements
- [ ] Added to CHANGELOG.md
```

## Branch Strategy

- **`main`** - Latest stable release
- **`develop`** - Active development
- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`docs/*`** - Documentation
- **`release/*`** - Release preparation

## Questions?

- 📖 Read the [documentation](docs/)
- 💬 Ask in [GitHub Discussions](https://github.com/orgs/community/discussions)
- 📧 Email maintainers (for sensitive issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🙏
