# RELEASE PROCESS

## 5.1 Release Workflow

### **Patch Release (1.0.0 → 1.0.1)**

```bash
# 1. Create hotfix branch
git checkout main
git checkout -b hotfix/v1.0.1

# 2. Fix the bug
# ... make changes ...
git commit -m "fix: resolve button data-testid issue"

# 3. Update version
npm version patch
# Updates package.json to 1.0.1, creates git tag

# 4. Update CHANGELOG.md
# Add entry for v1.0.1

# 5. Commit changelog
git add CHANGELOG.md
git commit -m "docs: update changelog for v1.0.1"

# 6. Merge to main
git checkout main
git merge hotfix/v1.0.1

# 7. Push with tags
git push origin main --tags

# 8. Build and publish
npm run build
cd dist/ngx-data-test-id
npm publish

# 9. Merge back to develop
git checkout develop
git merge main
```

### **Minor Release (1.0.0 → 1.1.0)**

```bash
# 1. Create release branch from develop
git checkout develop
git checkout -b release/v1.1.0

# 2. Bump version
npm version minor
# Updates to 1.1.0

# 3. Update CHANGELOG.md
# Move items from [Unreleased] to [1.1.0]

# 4. Final testing
npm run test
npm run build

# 5. Merge to main
git checkout main
git merge release/v1.1.0

# 6. Tag and push
git tag v1.1.0
git push origin main --tags

# 7. Publish
npm run build
cd dist/ngx-data-test-id
npm publish

# 8. Merge back to develop
git checkout develop
git merge main
```

### **Major Release (1.x.x → 2.0.0)**

```bash
# 1. Create v2.x branch (if not exists)
git checkout -b v2.x

# 2. Make breaking changes over time
# ... development work ...

# 3. When ready, create release branch
git checkout v2.x
git checkout -b release/v2.0.0

# 4. Bump version
npm version major
# Updates to 2.0.0

# 5. Update CHANGELOG.md
# Include migration guide link
# Highlight breaking changes

# 6. Update README.md
# Update compatibility matrix

# 7. Final testing in Angular 19, 20, 21
# ... thorough testing ...

# 8. Merge to main
git checkout main
git merge release/v2.0.0

# 9. Tag and push
git tag v2.0.0
git push origin main --tags

# 10. Publish with announcement
npm run build
cd dist/ngx-data-test-id
npm publish

# 11. Create GitHub Release
# Include migration guide
# Highlight breaking changes
```

## 5.2 GitHub Release Template

```markdown
## ngx-data-test-id v1.2.0

### 🎉 Features
- Add automatic data-testid generation directive
- Support for custom generation strategies
- Add validation service with duplicate detection

### 🔧 Improvements
- Performance optimization for large component trees
- Better TypeScript type inference

### 🐛 Bug Fixes
- Fix data-testid not applied to dynamically created elements
- Fix memory leak in service subscription

### 📚 Documentation
- Add comprehensive API documentation
- Add custom strategy guide

### ⬆️ Upgrade
```bash
npm install ngx-data-test-id@latest
```

### 🔗 Links
- [Changelog](link)
- [Documentation](link)
- [Migration Guide](link)

### 💡 Compatibility
- Angular 18, 19, 20
- TypeScript 5.0+

---

**Full Changelog**: https://github.com/user/repo/compare/v1.1.0...v1.2.0
```
