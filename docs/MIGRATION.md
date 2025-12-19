# Migration Guides

## From v1.x to v2.x

### Prerequisites
- Angular 19 or higher
- TypeScript 5.4+

### Breaking Changes

#### 1. Minimum Angular Version
**Before (v1.x):** Angular 18+
**After (v2.x):** Angular 19+

**Migration:**
```bash
# Update Angular first
ng update @angular/core@19 @angular/cli@19

# Then update library
npm install ngx-data-test-id@latest
```

#### 2. Service API Changes (Example)
**Before:**
```typescript
dataTestIdService.register(id, element);
```

**After:**
```typescript
dataTestIdService.registerDataTestId(id, element);
```

### Deprecations in v1.x
These features still work in v1.x but will be removed in v2.x:
- `register()` method → use `registerDataTestId()`

### No Changes Required
- All directive selectors remain the same
- Input/output names unchanged
- Generation strategies unchanged

---

## From v0.x to v1.x

### Breaking Changes
None - v1.0.0 is the stable release of v0.x beta.

### New Features
- Production-ready
- Complete documentation
- Full test coverage
