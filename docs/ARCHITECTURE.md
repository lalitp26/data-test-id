# Architecture

> **Note:** This document is a placeholder for future architectural documentation.

## Overview

This document will contain:
- Library architecture and design patterns
- Component interaction diagrams
- Strategy pattern implementation details
- Service architecture
- Extension points and customization

## Coming Soon

Full architectural documentation will be added in future releases.

## Current Structure

```
projects/ngx-data-test-id/src/
├── lib/
│   ├── directives/      # DataTestId and AutoDataTestId directives
│   ├── services/        # DataTestIdService for registration and validation
│   ├── strategies/      # Generation strategies for different element types
│   ├── models/          # Interfaces and types
│   └── utils/           # Helper utilities
└── public-api.ts        # Public API exports
```

## Key Concepts

### Directives
- `libDataTestId`: Manual data-testid assignment
- `libAutoDataTestId`: Automatic generation based on context

### Services
- `DataTestIdService`: Central service for registration, validation, and duplicate detection

### Strategies
- Strategy pattern for element-specific ID generation
- Extensible for custom generation logic

---

*More detailed architectural documentation coming soon.*
