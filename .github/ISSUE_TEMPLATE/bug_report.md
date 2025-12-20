---
name: Bug Report
about: Report a bug or unexpected behavior
title: '[BUG] '
labels: bug
assignees: ''
---

## Bug Description
<!-- A clear and concise description of the bug -->

## Version Information
- **ngx-data-test-id version:** [e.g., 1.0.0]
- **Angular version:** [e.g., 18.1.0]
- **TypeScript version:** [e.g., 5.4.0]
- **Browser:** [e.g., Chrome 120]
- **OS:** [e.g., Windows 11, macOS 14]

## Steps to Reproduce
1. Install ngx-data-test-id
2. Add directive `<button libDataTestId="test">Click</button>`
3. Run application
4. See error

## Expected Behavior
<!-- What you expected to happen -->

## Actual Behavior
<!-- What actually happened -->

## Code Sample
```typescript
// Minimal reproduction code
@Component({
  selector: 'app-example',
  template: `
    <button libDataTestId="submit-btn">Submit</button>
  `
})
export class ExampleComponent {}
```

## Error Messages
```
// Paste full error message and stack trace here
```

## Screenshots
<!-- If applicable, add screenshots to help explain the problem -->

## Additional Context
<!-- Any other information about the problem -->

## Checklist
- [ ] I have searched existing issues
- [ ] I have provided a minimal reproduction
- [ ] I have included version information
- [ ] I have included error messages (if any)
