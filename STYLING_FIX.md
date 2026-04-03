# Malipula Mobile - Styling Fix Documentation

## Overview
This document outlines the technical changes implemented to resolve broken styling in the React Native project on the Web platform, specifically addressing NativeWind v4 configuration on Windows environments.

## Problem Statement
The application appeared unstyled on the Web target because:
1.  **Metro Config Space Bug:** Absolute paths with spaces in Windows caused the NativeWind Metro loader to fail with `ERR_UNSUPPORTED_ESM_URL_SCHEME`.
2.  **Entry Point Missing:** The `@tailwind` directives in `global.css` were not being bundled into the web project entry.
3.  **NativeWind Preset:** The `tailwind.config.js` was missing the mandatory `nativewind/preset` for v4.

## Implemented Fixes

### 1. Metro Configuration
Reverted to a robust CommonJS-based `metro.config.js` that avoids absolute path imports for the PostCSS wrapper. This ensures the dev server starts reliably on Windows systems where project paths may contain spaces.

### 2. Styling Entry Point
Added `import './global.css'` to `index.ts`. This ensures that Tailwind utility classes used in the project are correctly compiled into the web bundle's CSS.

### 3. Tailwind & NativeWind v4 Integration
- **tailwind.config.js:** 
    - Added `presets: [require("nativewind/preset")]`.
    - Updated `content` to include `./App.tsx` and all source directories.
- **babel.config.js:** Added `nativewind/babel` to the plugins/presets list.
- **postcss.config.js:** Created a simplified PostCSS configuration using `tailwindcss` to process `global.css` during the web build.

### 4. Global Styles
Added standard Tailwind directives (`@tailwind base;` etc.) to `global.css` along with the **Malipula Brand** design tokens:
- **Colors:** Navy (`#1B2A4A`), Gold (`#C9A962`), Ivory (`#FAFAF5`).
- **Typography:** Playfair Display for headers, Inter for body.
- **Components:** Added `.glass` and `.text-gold-gradient` utility classes.

## Verification
- Run `npm run web` or `npx expo start --web`.
- Confirm the welcome screen in `App.tsx` displays the navy and gold theme with correct typography.

---
**Date:** April 4, 2026
**Lead AI Assistant:** Antigravity (Google DeepMind)
