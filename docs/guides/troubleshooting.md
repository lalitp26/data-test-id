# Troubleshooting Guide

Common issues and solutions for ngx-data-test-id.

## Installation Issues

### Cannot find module 'ngx-data-test-id'

**Problem:**
```
Error: Cannot find module 'ngx-data-test-id'
```

**Solutions:**
1. Install the package:
   ```bash
   npm install ngx-data-test-id
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Check that package.json includes the dependency:
   ```json
   {
     "dependencies": {
       "ngx-data-test-id": "^1.0.0"
     }
   }
   ```

## Runtime Errors

### data-testid not appearing

**Problem:** The data-testid attribute is not being added to elements.

**Solutions:**

1. **Check if imported correctly:**
   ```typescript
   // Standalone
   import { DataTestIdDirective } from 'ngx-data-test-id';
   
   @Component({
     imports: [DataTestIdDirective], // ← Must import
   })
   ```

   ```typescript
   // Module-based
   import { NgxDataTestIdModule } from 'ngx-data-test-id';
   
   @NgModule({
     imports: [NgxDataTestIdModule], // ← Must import
   })
   ```

2. **Check if running in development mode:**
   ```html
   <!-- Remove developmentMode if you want it in production -->
   <button 
     libDataTestId="submit-btn"
     [developmentMode]="false">
     Submit
   </button>
   ```

3. **Check Angular version compatibility:**
   - Angular 18+ required
   - Signal inputs require Angular 17.3+

### Property 'libDataTestId' does not exist

**Problem:**
```
Property 'libDataTestId' does not exist on element 'button'
```

**Solutions:**

1. Import the directive in your component
2. Check TypeScript configuration
3. Restart your dev server: `npm start`

## Build Errors

### @ɵINPUT_SIGNAL_BRAND_WRITE_TYPE error

**Problem:**
```
Property '@ɵINPUT_SIGNAL_BRAND_WRITE_TYPE@6418' does not exist
```

**Solution:** Version mismatch between library and app.
- Library must be built with Angular 18 if your app uses Angular 18
- Reinstall with correct version:
  ```bash
  npm install ngx-data-test-id@latest
  ```

### Module not found in production build

**Problem:** Works in dev, fails in production build.

**Solutions:**

1. Ensure library is in `dependencies`, not `devDependencies`:
   ```json
   {
     "dependencies": {
       "ngx-data-test-id": "^1.0.0"
     }
   }
   ```

2. Clear Angular cache:
   ```bash
   rm -rf .angular
   npm run build
   ```

## Validation Errors

### Validation fails with "Invalid format"

**Problem:**
```
[libDataTestId] Invalid format: 'myButton'
```

**Solution:** Use kebab-case:
```html
<!-- ❌ Bad -->
<button libDataTestId="myButton">

<!-- ✅ Good -->
<button libDataTestId="my-button">
```

Or disable validation:
```html
<button 
  libDataTestId="myButton"
  [validate]="false">
```

## Testing Issues

### Cannot find element in tests

**Problem:** `cy.get('[data-testid="my-btn"]')` returns no elements.

**Solutions:**

1. **Verify testid in DOM:**
   - Open browser dev tools
   - Inspect element
   - Check for `data-testid` attribute

2. **Check if conditionally rendered:**
   ```html
   <button *ngIf="showButton" libDataTestId="my-btn">
   ```
   Ensure condition is true in test.

3. **Wait for element:**
   ```javascript
   // Cypress
   cy.get('[data-testid="my-btn"]', { timeout: 10000 });
   
   // Playwright
   await page.waitForSelector('[data-testid="my-btn"]');
   ```

4. **Check spelling:**
   ```html
   <!-- Template -->
   <button libDataTestId="submit-btn">
   
   <!-- Test - must match exactly -->
   cy.get('[data-testid="submit-btn"]') // ✅
   cy.get('[data-testid="submit-button"]') // ❌ Wrong
   ```

## Performance Issues

### Slow page load

**Problem:** Many data-testid attributes slow down the app.

**Solutions:**

1. **Use development mode:**
   ```html
   <div 
     libDataTestId="debug-info"
     [developmentMode]="true">
     <!-- Only in dev -->
   </div>
   ```

2. **Don't overuse auto generation:**
   ```html
   <!-- ❌ Bad - Every element -->
   <div libAutoDataTestId>
     <span libAutoDataTestId>Text</span>
     <span libAutoDataTestId>More</span>
   </div>
   
   <!-- ✅ Good - Only testable elements -->
   <div>
     <span>Text</span>
     <button libDataTestId="action-btn">Action</button>
   </div>
   ```

## TypeScript Issues

### Type errors with inputs

**Problem:**
```typescript
Type 'string' is not assignable to type 'InputSignal<string | null>'
```

**Solution:** Use signal inputs correctly:
```typescript
// ❌ Wrong
libDataTestId = 'my-id';

// ✅ Correct
readonly libDataTestId = input<string | null>('my-id');
```

## Common Mistakes

### 1. Forgetting to import

```typescript
// ❌ Missing import
@Component({
  selector: 'app-login',
  standalone: true,
  template: `<button libDataTestId="btn">Click</button>`
})

// ✅ With import
import { DataTestIdDirective } from 'ngx-data-test-id';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DataTestIdDirective], // ← Added
  template: `<button libDataTestId="btn">Click</button>`
})
```

### 2. Wrong naming convention

```html
<!-- ❌ Wrong -->
<button libDataTestId="submitButton">Submit</button>
<button libDataTestId="submit_button">Submit</button>

<!-- ✅ Correct -->
<button libDataTestId="submit-button">Submit</button>
```

### 3. Using in wrong Angular version

- **Minimum:** Angular 18.0.0
- **Recommended:** Angular 18.2.0+

### 4. Not using prefix for organization

```html
<!-- ❌ Hard to manage -->
<button libDataTestId="button1">Save</button>
<button libDataTestId="button2">Cancel</button>

<!-- ✅ Well organized -->
<button 
  libDataTestId="save-btn"
  [libDataTestIdPrefix]="'settings'">
  Save
</button>
```

## Getting Help

Still having issues?

1. **Check the documentation:**
   - [Getting Started](getting-started.md)
   - [API Reference](../API.md)

2. **Search existing issues:**
   - [GitHub Issues](https://github.com/username/ngx-data-test-id/issues)

3. **Ask for help:**
   - [GitHub Discussions](https://github.com/username/ngx-data-test-id/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/ngx-data-test-id) with tag `ngx-data-test-id`

4. **Report a bug:**
   - [Create a bug report](https://github.com/username/ngx-data-test-id/issues/new?template=bug_report.md)
   - Include version information
   - Provide a minimal reproduction

## FAQ

**Q: Does this work with Angular Universal/SSR?**  
A: Yes, it's compatible with SSR.

**Q: Can I use this with older Angular versions?**  
A: No, minimum Angular 18 is required.

**Q: Will data-testids affect performance?**  
A: Minimal impact. Use `developmentMode` for debug-only testids.

**Q: Can I customize the validation rules?**  
A: Not yet, but it's planned for future versions.

**Q: Does this work with Angular Elements?**  
A: Yes, fully compatible.

---

If your issue isn't listed here, please [open an issue](https://github.com/username/ngx-data-test-id/issues) or ask in [Discussions](https://github.com/username/ngx-data-test-id/discussions)!
