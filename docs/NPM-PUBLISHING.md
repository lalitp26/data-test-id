# NPM PUBLISHING WORKFLOW

## 4.1 Pre-Publishing Checklist

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console.log statements
- [ ] Code reviewed

### Documentation
- [ ] README.md updated
- [ ] CHANGELOG.md updated
- [ ] API docs updated
- [ ] Migration guide (if breaking changes)
- [ ] Examples tested

### Version Management
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] CHANGELOG has release date
- [ ] All commits pushed

### Package Configuration
- [ ] package.json correct
- [ ] .npmignore configured
- [ ] Peer dependencies correct
- [ ] Keywords added for discoverability

### Testing
- [ ] Tested in Angular 18 app
- [ ] Tested in Angular 19 app (if supported)
- [ ] Tested in Angular 20 app (if supported)
- [ ] Standalone components tested
- [ ] Module-based apps tested

## 4.2 package.json Configuration

```json
{
  "name": "ngx-data-test-id",
  "version": "1.0.0",
  "description": "Automated and manual data-testid management for Angular",
  "keywords": [
    "angular",
    "testing",
    "data-testid",
    "e2e",
    "automation",
    "qa",
    "test-automation",
    "angular18",
    "angular19",
    "angular20"
  ],
  "author": "username",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-github-username-or-org/ngx-data-test-id.git"
  },
  "bugs": {
    "url": "https://github.com/your-github-username-or-org/ngx-data-test-id/issues"
  },
  "homepage": "https://github.com/your-github-username-or-org/ngx-data-test-id#readme",
  "peerDependencies": {
    "@angular/common": "^18.0.0 || ^19.0.0 || ^20.0.0",
    "@angular/core": "^18.0.0 || ^19.0.0 || ^20.0.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  }
}
```

## 4.3 .npmignore Configuration

```
# Source files
src/
*.ts
!*.d.ts

# Tests
*.spec.ts
*.spec.js
test/
coverage/

# Build config
tsconfig.json
tsconfig.lib.json
ng-package.json
angular.json

# Development
.git/
.github/
.vscode/
node_modules/
.editorconfig
.gitignore

# Documentation (if not needed in package)
docs/
*.md
!README.md
!CHANGELOG.md
!LICENSE.md
```

## 4.4 Publishing Commands

```bash
# 1. Build the library
npm run build

# 2. Navigate to dist folder
cd dist/ngx-data-test-id

# 3. Test the package locally first
npm pack
# Creates ngx-data-test-id-1.0.0.tgz

# 4. Test in another project
cd /path/to/test-project
npm install /path/to/ngx-data-test-id-1.0.0.tgz

# 5. If all good, publish to NPM
cd /path/to/dist/ngx-data-test-id

# First time - login to NPM
npm login

# Publish (double-check version!)
npm publish

# For beta releases
npm publish --tag beta

# For next major version (users won't get it by default)
npm publish --tag next
```

## 4.5 NPM Distribution Tags

```bash
# Latest (default)
npm publish                    # Users get this with: npm install ngx-data-test-id
# Tag: latest

# Beta testing
npm publish --tag beta         # Users get this with: npm install ngx-data-test-id@beta
# Tag: beta

# Next major version
npm publish --tag next         # Users get this with: npm install ngx-data-test-id@next
# Tag: next

# View all tags
npm dist-tag ls ngx-data-test-id
```

**Tag Strategy:**
```
latest: v1.2.0  (stable, production-ready)
beta: v1.3.0-beta.1  (testing next minor)
next: v2.0.0-rc.1  (testing next major)
v1.x: v1.2.0  (maintain v1 line)
```

## 4.6 Automated Publishing with GitHub Actions

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build library
        run: npm run build
      
      - name: Run tests
        run: npm test
      
      - name: Publish to NPM
        run: cd dist/ngx-data-test-id && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
