# NAMING CONVENTIONS & BEST PRACTICES

## 1.1 Library Package Name (NPM)

### **Pattern:** `ngx-{feature-name}`

**✅ Good Examples:**
- `ngx-data-test-id` ← Our library
- `ngx-bootstrap`
- `ngx-datatable`
- `ngx-translate`
- `ngx-mask`

**❌ Bad Examples:**
- `angular-data-test-id` (Use 'ngx' prefix)
- `data-test-id` (Missing prefix, unclear it's Angular)
- `NgxDataTestId` (Use kebab-case, not PascalCase)
- `ngx_data_test_id` (Use hyphens, not underscores)
- `ngx-dtid` (Too abbreviated, unclear purpose)

### **Rules:**
1. **Always use `ngx-` prefix** (Established Angular community convention)
2. **Use kebab-case** (lowercase with hyphens)
3. **Be descriptive** (Clear purpose from name)
4. **Avoid abbreviations** (Unless widely known like 'i18n', 'a11y')
5. **Check availability** on NPM first: `npm search ngx-data-test-id`

### **Scope (Optional for Organizations):**
```bash
# For personal/company packages
@mycompany/ngx-data-test-id

# Examples:
@angular/material
@ngrx/store
@ngxs/store
```

**When to use scoped packages:**
- ✅ Company internal libraries
- ✅ Suite of related libraries
- ✅ Name collision (your preferred name is taken)
- ❌ Public open-source (harder to discover)

---

## 1.2 Module Names (If Using NgModules)

### **Pattern:** `{Feature}Module`

```typescript
// ✅ Good
export class NgxDataTestIdModule {}
export class DataTestIdModule {}

// ❌ Bad
export class DataTestIdMod {}
export class DTIDModule {}
export class NgxDataTestIdLibModule {} // Redundant 'Lib'
```

**For Standalone Libraries (Angular 14+):**
- Export directives/components directly
- No need for NgModule at all
- Module only for backward compatibility

---

## 1.3 Directive & Component Selectors

### **Pattern for Directives:** `[lib{FeatureName}]` or `[{companyPrefix}{FeatureName}]`

**Why prefix?**
- Avoid conflicts with native HTML attributes
- Avoid conflicts with other libraries
- Clear ownership

**✅ Good Examples:**
```typescript
// Our library
@Directive({ selector: '[libDataTestId]' })
@Directive({ selector: '[libAutoDataTestId]' })

// Other libraries
@Directive({ selector: '[ngxMask]' })
@Directive({ selector: '[matTooltip]' }) // Angular Material
@Directive({ selector: '[nzButton]' })   // NG-ZORRO
```

**❌ Bad Examples:**
```typescript
@Directive({ selector: '[dataTestId]' })     // No prefix, might conflict
@Directive({ selector: '[data-test-id]' })   // Attribute style, confusing
@Directive({ selector: '[lib-data-test-id]' }) // Kebab-case in selector
@Directive({ selector: '[DATATESTID]' })     // All caps
```

### **Selector Naming Rules:**
1. **Use camelCase** inside brackets: `[libDataTestId]`
2. **Start with prefix** (`lib`, `ngx`, `app`, company prefix)
3. **Be descriptive** but concise
4. **No hyphens** in directive selectors (use camelCase)

### **Component Selectors:** `{prefix}-{feature-name}`

```typescript
// ✅ Good
@Component({ selector: 'lib-data-testid-badge' })
@Component({ selector: 'ngx-data-table' })

// ❌ Bad
@Component({ selector: 'dataTestIdBadge' })  // No prefix
@Component({ selector: 'lib_badge' })        // Use hyphens, not underscores
```

**Component Selector Rules:**
1. **Use kebab-case** for components
2. **Start with prefix** (2-3 letters)
3. **Must be at least 2 segments** (`lib-badge`, not `badge`)

---

## 1.4 Service Names

### **Pattern:** `{Feature}Service`

```typescript
// ✅ Good
export class DataTestIdService {}
export class ValidationService {}
export class DataTestIdRegistryService {}

// ❌ Bad
export class DataTestIdSvc {}      // Abbreviated
export class DataTestId {}         // Missing 'Service' suffix
export class LibDataTestIdService {} // Redundant 'Lib' prefix
```

**Rules:**
1. **Always end with `Service`** suffix
2. **PascalCase** for class names
3. **Descriptive** of what it does
4. **No prefix needed** (lib/ngx) - it's inside your package

---

## 1.5 Input & Output Names

### **Inputs Pattern:** `{directive/componentName}{PropertyName}`

**For our library:**
```typescript
// ✅ Good - Consistent with directive name
@Directive({ selector: '[libDataTestId]' })
export class DataTestIdDirective {
  libDataTestId = input<string | null>(null);
  libDataTestIdPrefix = input<string | null>(null);
  libDataTestIdSuffix = input<string | null>(null);
  developmentMode = input<boolean>(false);    // Generic, no prefix needed
  validate = input<boolean>(true);            // Generic, no prefix needed
}

// Usage:
<button 
  libDataTestId="submit-btn"
  [libDataTestIdPrefix]="'form'"
  [developmentMode]="true">
```

**Why prefix inputs?**
- ✅ Main input matches selector (intuitive)
- ✅ Namespaced (avoid conflicts with other directives)
- ✅ Auto-complete shows related properties together

**When NOT to prefix:**
- Generic boolean flags: `disabled`, `hidden`, `validate`
- Standard Angular inputs: `ngClass`, `ngStyle`
- Very common patterns: `placeholder`, `label`

### **Outputs Pattern:** `{event}` or `{directive}{Event}`

```typescript
// ✅ Good
@Output() dataTestIdChange = new EventEmitter<string>();
@Output() validationError = new EventEmitter<string>();
@Output() registered = new EventEmitter<void>();

// ❌ Bad
@Output() onDataTestIdChange = new EventEmitter(); // Don't use 'on' prefix
@Output() DataTestIdChange = new EventEmitter();   // Should be camelCase
```

---

## 1.6 File Naming

### **Angular File Naming Convention:**

**Pattern:** `{feature}.{type}.ts`

```
✅ Good Structure:
lib/
├── directives/
│   ├── data-test-id.directive.ts           ← Directive class
│   ├── data-test-id.directive.spec.ts      ← Tests
│   ├── auto-data-test-id.directive.ts
│   └── auto-data-test-id.directive.spec.ts
├── services/
│   ├── data-test-id.service.ts
│   └── data-test-id.service.spec.ts
├── models/
│   ├── data-test-id-options.model.ts       ← Interface/Type
│   └── validation-result.model.ts
├── strategies/
│   ├── base-strategy.ts                    ← Base class
│   ├── button-strategy.ts
│   ├── input-strategy.ts
│   └── index.ts                            ← Barrel export
└── utils/
    ├── string-utils.ts
    ├── string-utils.spec.ts
    └── index.ts

❌ Bad Examples:
data-testid-directive.ts      // Missing .directive
DataTestId.ts                  // PascalCase in filename
data_test_id.service.ts        // Underscores instead of hyphens
dataTestIdService.ts           // camelCase instead of kebab-case
```

### **File Naming Rules:**
1. **kebab-case** for all filenames
2. **Include type suffix**: `.directive`, `.service`, `.component`, `.pipe`, `.model`
3. **Test files**: Add `.spec` before `.ts`
4. **Barrel exports**: Use `index.ts` for folder exports

### **Type Suffixes:**
| Type | Suffix | Example |
|------|--------|---------|
| Directive | `.directive.ts` | `data-test-id.directive.ts` |
| Component | `.component.ts` | `badge.component.ts` |
| Service | `.service.ts` | `registry.service.ts` |
| Pipe | `.pipe.ts` | `format.pipe.ts` |
| Guard | `.guard.ts` | `auth.guard.ts` |
| Interceptor | `.interceptor.ts` | `auth.interceptor.ts` |
| Model/Interface | `.model.ts` or `.interface.ts` | `options.model.ts` |
| Utility | `.util.ts` or `.utils.ts` | `string.utils.ts` |
| Constants | `.constants.ts` | `config.constants.ts` |
| Types | `.types.ts` | `custom.types.ts` |

---

## 1.7 Class Naming

### **Pattern:** `{Feature}{Type}`

```typescript
// ✅ Good - Clear, descriptive, follows Angular conventions
export class DataTestIdDirective {}
export class AutoDataTestIdDirective {}
export class DataTestIdService {}
export class ButtonDataTestIdStrategy {}
export class DataTestIdOptions {}

// ❌ Bad
export class DataTestId {}              // What is it? Service? Directive?
export class DTIDDirective {}           // Abbreviated
export class dataTestIdDirective {}     // Should be PascalCase
export class DataTestIdDir {}           // Don't abbreviate type
```

**Rules:**
1. **PascalCase** always
2. **Include type suffix** (Directive, Service, Component, etc.)
3. **No abbreviations** unless universally known
4. **Descriptive** of purpose

---

## 1.8 Interface & Type Naming

### **Interfaces:**

```typescript
// ✅ Good
export interface DataTestIdOptions {
  prefix?: string;
  suffix?: string;
  validate?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface DataTestIdStrategy {
  generate(element: HTMLElement): string | null;
}

// ❌ Bad
export interface IDataTestIdOptions {}  // Don't use 'I' prefix (old convention)
export interface dataTestIdOptions {}   // Should be PascalCase
export interface Options {}             // Too generic
```

**Rules:**
1. **No 'I' prefix** (old convention, avoid in modern TypeScript)
2. **PascalCase**
3. **Descriptive names**
4. **End with the entity type** if needed: `Options`, `Config`, `Result`

### **Type Aliases:**

```typescript
// ✅ Good
export type DataTestIdValue = string | null;
export type GenerationStrategy = 'automatic' | 'manual' | 'hybrid';
export type ValidationLevel = 'error' | 'warning' | 'info';

// ❌ Bad
export type DTIDValue = string | null;  // Abbreviated
export type Strategy = string;          // Too generic
```

---

## 1.9 Method & Function Naming

### **Pattern:** `{verb}{Noun}` or `{verb}{Noun}{Modifier}`

```typescript
// ✅ Good - Clear intent
generateDataTestId(element: HTMLElement): string
validateFormat(id: string): boolean
registerDataTestId(id: string, element: HTMLElement): void
unregisterDataTestId(id: string, element: HTMLElement): void
setDataTestIdAttribute(id: string): void
getElementLabel(element: HTMLElement): string | null

// ❌ Bad
dtid(element: HTMLElement): string           // Abbreviated
validate(id: string): boolean                // What is being validated?
register(id: string): void                   // Register what?
set(id: string): void                        // Set what where?
```

**Verb Conventions:**
| Verb | Purpose | Example |
|------|---------|---------|
| `get` | Retrieve value | `getDataTestId()` |
| `set` | Assign value | `setDataTestId()` |
| `is`/`has` | Boolean check | `isValid()`, `hasPrefix()` |
| `validate` | Check validity | `validateFormat()` |
| `generate` | Create new value | `generateId()` |
| `register` | Add to registry | `registerElement()` |
| `unregister` | Remove from registry | `unregisterElement()` |
| `find` | Search for item | `findDuplicates()` |
| `calculate` | Compute value | `calculateScore()` |
| `format` | Transform data | `formatId()` |

**Rules:**
1. **camelCase** for methods
2. **Start with verb** (action-oriented)
3. **Be specific** about what it does
4. **Boolean methods** start with `is`, `has`, `can`, `should`

---

## 1.10 Variable & Constant Naming

### **Variables:**

```typescript
// ✅ Good - camelCase, descriptive
private currentDataTestId: string | null = null;
private readonly element: HTMLElement;
private validationErrors: string[] = [];
const generatedId = this.generate(element);

// ❌ Bad
private curr_id: string;           // Underscores, abbreviated
private DataTestId: string;        // PascalCase (should be camelCase)
private e: HTMLElement;            // Single letter (too short)
```

### **Constants:**

```typescript
// ✅ Good - SCREAMING_SNAKE_CASE for true constants
export const DEFAULT_PREFIX = 'data-test';
export const MAX_ID_LENGTH = 100;
export const VALIDATION_PATTERNS = {
  KEBAB_CASE: /^[a-z][a-z0-9-]*$/,
  NO_SPACES: /^\S+$/,
};

// Configuration objects can be PascalCase
export const DefaultConfig = {
  validate: true,
  developmentMode: false,
} as const;

// ❌ Bad
export const defaultPrefix = 'data-test';  // Should be SCREAMING_SNAKE_CASE
export const DEFAULT-PREFIX = 'test';      // Can't use hyphens
```

**Rules:**
1. **camelCase** for variables
2. **SCREAMING_SNAKE_CASE** for true constants (primitive values)
3. **PascalCase** for object configs (optional)
4. **Descriptive names** (avoid single letters except in loops)

---

## 1.11 Private vs Public Naming

```typescript
export class DataTestIdDirective {
  // ✅ Good - Clear public API
  public readonly libDataTestId = input<string | null>(null);
  
  // Private - use 'private' keyword (no underscore prefix needed)
  private currentId: string | null = null;
  private readonly element = inject(ElementRef);
  
  // Public methods - no prefix
  ngOnInit(): void {}
  
  // Private methods - no prefix, just 'private' keyword
  private generateId(): string {
    return this.buildId();
  }
  
  private buildId(): string {
    return '';
  }
}

// ❌ Bad - Old convention
export class BadExample {
  private _currentId: string;      // Don't use underscore prefix
  public m_element: HTMLElement;   // Don't use 'm_' prefix
}
```

**Rules:**
1. **Use `private`/`public` keywords** (no underscores)
2. **No prefixes** for private members
3. **Modern TypeScript** handles access modifiers

---

## 1.12 Folder Structure Naming

```
ngx-data-test-id/                    ← Library root (kebab-case)
└── projects/
    └── ngx-data-test-id/            ← Library folder (matches package name)
        └── src/
            ├── public-api.ts        ← Barrel export
            └── lib/                 ← All library code
                ├── directives/      ← Plural
                ├── services/        ← Plural
                ├── models/          ← Plural
                ├── strategies/      ← Plural
                ├── pipes/           ← Plural (if needed)
                ├── components/      ← Plural (if needed)
                └── utils/           ← Plural (helper functions)
```

**Folder Naming Rules:**
1. **kebab-case** for all folders
2. **Plural names** for type folders (`directives`, not `directive`)
3. **Group by type** (directives, services) or **by feature** (for large libs)
4. **No nesting** more than 2-3 levels deep

---

## 1.13 Test File Naming

```typescript
// Source file
data-test-id.directive.ts

// Test file (same name + .spec)
data-test-id.directive.spec.ts

// Test suite structure
describe('DataTestIdDirective', () => {
  describe('ngOnInit', () => {
    it('should generate data-testid when not provided', () => {});
    it('should use provided data-testid', () => {});
    it('should apply prefix when specified', () => {});
  });
  
  describe('validation', () => {
    it('should validate kebab-case format', () => {});
    it('should reject spaces in id', () => {});
  });
});
```

**Test Naming Rules:**
1. **Match source file name** + `.spec.ts`
2. **`describe` blocks** use class/function names
3. **`it` blocks** use clear, readable sentences
4. **Start tests with "should"** for clarity

---

## 1.14 Real-World Examples from Popular Libraries

### **Angular Material:**
```typescript
// Package: @angular/material
// Directives:
@Directive({ selector: '[matTooltip]' })
@Directive({ selector: '[matButton]' })

// Services:
export class MatDialog {}
export class MatSnackBar {}

// Components:
@Component({ selector: 'mat-card' })
@Component({ selector: 'mat-button' })
```

### **NGX-Bootstrap:**
```typescript
// Package: ngx-bootstrap
// Directives:
@Directive({ selector: '[tooltip]' })  // No prefix (older library)
@Directive({ selector: '[dropdown]' })

// Components:
@Component({ selector: 'bs-dropdown' })
@Component({ selector: 'alert' })      // Inconsistent
```

### **NG-ZORRO (Ant Design):**
```typescript
// Package: ng-zorro-antd
// Consistent 'nz' prefix:
@Component({ selector: 'nz-button' })
@Component({ selector: 'nz-input' })
@Directive({ selector: '[nz-tooltip]' })
```

**Key Takeaway:** Use consistent prefixing like NG-ZORRO and Angular Material.

---

## 1.15 Our Library Naming Summary

### **For ngx-data-test-id:**

```typescript
// Package name
"name": "ngx-data-test-id"

// Directives (use 'lib' prefix to avoid conflicts)
@Directive({ selector: '[libDataTestId]' })
export class DataTestIdDirective {
  libDataTestId = input<string | null>(null);
  libDataTestIdPrefix = input<string | null>(null);
}

@Directive({ selector: '[libAutoDataTestId]' })
export class AutoDataTestIdDirective {}

// Services
export class DataTestIdService {
  registerDataTestId(id: string, element: HTMLElement): void {}
  unregisterDataTestId(id: string, element: HTMLElement): void {}
  validateFormat(id: string): boolean {}
}

// Models
export interface DataTestIdOptions {
  prefix?: string;
  suffix?: string;
  validate?: boolean;
}

// Strategies
export interface DataTestIdStrategy {
  generate(element: HTMLElement): string | null;
}

export class ButtonDataTestIdStrategy implements DataTestIdStrategy {}
export class InputDataTestIdStrategy implements DataTestIdStrategy {}

// Files
lib/
├── directives/
│   ├── data-test-id.directive.ts
│   ├── data-test-id.directive.spec.ts
│   ├── auto-data-test-id.directive.ts
│   └── auto-data-test-id.directive.spec.ts
├── services/
│   ├── data-test-id.service.ts
│   └── data-test-id.service.spec.ts
├── models/
│   └── data-test-id-options.model.ts
└── strategies/
    ├── data-test-id-strategy.interface.ts
    ├── base-data-test-id.strategy.ts
    ├── button-data-test-id.strategy.ts
    └── input-data-test-id.strategy.ts
```

---

## 1.16 Checklist: Before Naming Anything

**Package/Library Name:**
- [ ] Uses `ngx-` prefix
- [ ] Kebab-case format
- [ ] Clear, descriptive purpose
- [ ] Checked NPM availability
- [ ] Not abbreviated

**Selectors:**
- [ ] Directives: `[libFeatureName]` (camelCase)
- [ ] Components: `lib-feature-name` (kebab-case)
- [ ] Consistent prefix across library

**Classes:**
- [ ] PascalCase
- [ ] Includes type suffix (Directive, Service, etc.)
- [ ] No abbreviations
- [ ] Descriptive

**Files:**
- [ ] Kebab-case
- [ ] Includes type suffix (.directive.ts)
- [ ] Matches class name (converted to kebab-case)
- [ ] Test files have .spec.ts

**Methods:**
- [ ] camelCase
- [ ] Starts with verb
- [ ] Descriptive of action
- [ ] Boolean methods start with is/has/can

**Properties:**
- [ ] camelCase for variables
- [ ] SCREAMING_SNAKE_CASE for constants
- [ ] Descriptive names
- [ ] No single letters (except loop counters)
