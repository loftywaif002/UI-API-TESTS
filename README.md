# UI and API Tests for Checkers and Card Game

## Overview

This project contains UI and API tests using [Playwright](https://playwright.dev/). The tests are organized into two main folders: `ui-tests` for UI testing and `api-tests` for API testing.

## UI Tests - Checkers Game

### Folder Structure

ui-tests/
|-- checkers-game/
| |-- checkers-game.spec.ts
| |-- ...
|-- playwright.config.js

### Running UI Tests

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```
2. Run the UI tests:
   ```bash
   npx playwright test --project=ui-tests --ui
   ```

## API Tests - Card Game

### Folder Structure

api-tests/
|-- card-game/
| |-- card-game.spec.ts

### Running API Tests

1. Run the API tests:
   ```bash
   npx playwright test --project=api-tests
   ```
