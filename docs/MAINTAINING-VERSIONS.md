# MAINTAINING OLDER VERSIONS

## 2.1 Branch Strategy

```
main (v1.x - current stable)
├─ develop (v1.x next features)
├─ release/v1.0.0
├─ release/v1.1.0
└─ hotfix/v1.0.1

v2.x (future major)
├─ develop-v2
└─ release/v2.0.0
```

**Branch Types:**

### **main**
- Always contains latest stable release
- Protected branch, only release commits
- Tagged with version numbers

### **develop**
- Active development for next minor version
- Feature branches merge here
- CI/CD runs on every commit

### **release/vX.Y.Z**
- Created when preparing release
- Final testing, documentation updates
- Merged to main and tagged

### **hotfix/vX.Y.Z**
- Emergency fixes for production issues
- Created from main
- Merged back to main and develop

### **v2.x, v3.x**
- Long-lived branches for next major versions
- Created when starting breaking changes
- Eventually becomes main when released

## 2.2 Backporting Bug Fixes

When bug found in v1.x but v2.x is active:

```bash
# Fix in current version first
git checkout main
git checkout -b hotfix/v1.0.1
# Fix the bug
git commit -m "fix: resolve data-testid not applied to inputs"
git tag v1.0.1
git push origin v1.0.1

# Cherry-pick to v2.x if applicable
git checkout v2.x
git cherry-pick <commit-hash>
```

**Priority Rules:**
- Critical security: All supported versions
- Major bugs: Current + previous major version
- Minor bugs: Current version only

## 2.3 Long-Term Support (LTS) Strategy

**Standard Release:**
- 6 months maintenance after superseded

**LTS Release (Optional):**
- v1.0.0 could be LTS → 18 months support
- Tag as: v1.0.0-lts
- For enterprises needing longer support

Example:
```
v1.0.0-lts (Released Jan 2025)
├─ Active support: Jan 2025 - Jan 2026
└─ Maintenance: Jan 2026 - Jul 2026

v2.0.0 (Released Jul 2025)
├─ v1.x enters maintenance mode
└─ v1.x EOL: Jan 2026
```
