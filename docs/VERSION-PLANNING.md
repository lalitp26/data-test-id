# VERSION PLANNING STRATEGY

## 1.1 Semantic Versioning (SemVer)
Format: `MAJOR.MINOR.PATCH` (e.g., 1.2.3)

### **MAJOR Version (X.0.0)**
Increment when:
- ❌ Breaking changes (API changes, removed features)
- ❌ Drop support for Angular versions
- ❌ Rename directives/services/inputs
- ❌ Change selector names
- ❌ Require code changes from users

Examples:
- v1.0.0 → v2.0.0: Drop Angular 18 support, now requires Angular 19+
- v2.0.0 → v3.0.0: Rename `libDataTestId` to `dataTestId`

### **MINOR Version (x.Y.0)**
Increment when:
- ✅ New features added (backward compatible)
- ✅ New directives/services
- ✅ New optional inputs/outputs
- ✅ Deprecate features (but keep them working)
- ✅ New generation strategies

Examples:
- v1.0.0 → v1.1.0: Add new strategy for form elements
- v1.1.0 → v1.2.0: Add `libAutoDataTestId` directive
- v1.2.0 → v1.3.0: Add validation service

### **PATCH Version (x.y.Z)**
Increment when:
- 🔧 Bug fixes only
- 🔧 Documentation updates
- 🔧 Performance improvements (no API changes)
- 🔧 Internal refactoring
- 🔧 Security patches

Examples:
- v1.0.0 → v1.0.1: Fix data-testid not applied to button elements
- v1.0.1 → v1.0.2: Fix memory leak in service

### **Pre-release Versions**
Format: `X.Y.Z-tag.number`
- `0.1.0-alpha.1` - Very early, unstable
- `0.1.0-beta.1` - Feature complete, testing phase
- `0.1.0-rc.1` - Release candidate, production-ready candidate
- `1.0.0` - First stable release

## 1.2 Version Roadmap

```
Phase 1: Pre-release (Q4 2024 - Q1 2025)
├─ v0.1.0-alpha.1 → Initial prototype
├─ v0.1.0-beta.1  → Feature complete, team testing
├─ v0.1.0-rc.1    → Release candidate
└─ Built with: Angular 18

Phase 2: Stable v1.x (2025-2026)
├─ v1.0.0 → First stable release
│   └─ Supports: Angular 18, 19, 20
├─ v1.1.0 → Add custom strategy API
├─ v1.2.0 → Add auto directive
├─ v1.3.0 → Add validation warnings
└─ Built with: Angular 18

Phase 3: v2.x - Drop Angular 18 (2026-2027)
├─ v2.0.0 → BREAKING: Minimum Angular 19
│   └─ Supports: Angular 19, 20, 21
├─ v2.1.0 → New features using Angular 19 APIs
└─ Built with: Angular 19

Phase 4: v3.x - Drop Angular 19 (2027-2028)
├─ v3.0.0 → BREAKING: Minimum Angular 20
└─ Built with: Angular 20
```

## 1.3 Angular Version Support Matrix

| Library Version | Built With | Supports Angular | Status | End of Life |
|----------------|------------|------------------|---------|-------------|
| 0.x.x          | 18         | 18, 19, 20       | Beta    | On v1.0.0 release |
| 1.x.x          | 18         | 18, 19, 20       | Active  | 6 months after v2.0.0 |
| 2.x.x          | 19         | 19, 20, 21       | Future  | 6 months after v3.0.0 |
| 3.x.x          | 20         | 20, 21, 22       | Future  | TBD |

**Support Policy:**
- **Active Support:** Bug fixes, security patches, new features
- **Maintenance Mode:** Critical bugs and security only (6 months)
- **End of Life:** No updates
