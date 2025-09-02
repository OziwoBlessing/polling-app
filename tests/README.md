# Testing Documentation

## Overview

This project uses Vitest as the testing framework along with React Testing Library for component testing. The tests are organized into the following structure:

```
tests/
├── helpers/       # Test helper functions
├── integration/   # Integration tests
├── setup.ts       # Global test setup
└── unit/          # Unit tests
```

## Test Types

### Unit Tests

Unit tests focus on testing individual functions and components in isolation. For example, the `getPollById` function is tested to ensure it correctly retrieves polls by ID.

### Integration Tests

Integration tests verify that different parts of the application work together correctly. For example, the voting functionality is tested to ensure the form submission process works as expected.

## Test Helpers

The `tests/helpers` directory contains utility functions that are used across multiple tests:

- `pollHelpers.ts`: Provides functions for working with poll IDs in tests, such as getting valid and invalid poll IDs.

## Running Tests

The following npm scripts are available for running tests:

- `npm test`: Run all tests once
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage reporting

## Writing New Tests

When writing new tests, follow these guidelines:

1. Place unit tests in the `tests/unit` directory
2. Place integration tests in the `tests/integration` directory
3. Use descriptive test names that explain what is being tested
4. Follow the Arrange-Act-Assert pattern in test cases
5. Mock external dependencies when necessary