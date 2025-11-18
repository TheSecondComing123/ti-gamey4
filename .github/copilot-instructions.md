# TI-GAMEY4 Copilot Instructions

## Project Overview

Next.js 16 + React 19 + TypeScript website for TI-84 Plus CE calculator modding, games, and apps. Uses App Router with shadcn/ui component library and Tailwind CSS v4 with OKLCH color system.

## Architecture & Structure

### Key Directories

- `app/` - Next.js App Router pages (route groups: `/`, `/games`, `/apps`, `/guides`, `/about`)
- `components/` - Organized as `layout/` (Header, Footer, MainLayout) and `ui/` (shadcn components)
- `hooks/` - Custom React hooks with "use client" directive
- `lib/` - Utilities split into `api/` and `utils/` subdirectories
- `types/` - TypeScript type definitions

### Import Aliases (tsconfig.json paths)

Always use `@/` prefix for imports:

```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useDarkMode } from "@/hooks/useDarkMode";
```

### Barrel Exports Pattern

All `components/`, `hooks/`, `lib/utils/`, and type directories use `index.ts` barrel exports. Add new exports to these files:

```typescript
// components/ui/index.ts
export * from "./Button";
export * from "./Card";
```

## Component Conventions

### shadcn/ui Integration

- Configured via `components.json` with "new-york" style
- Component variants use `class-variance-authority` (CVA)
- All UI components use `cn()` utility for className merging (never manually use `clsx` or `twMerge`)
- Icons from `lucide-react` library

Example shadcn pattern from `Button.tsx`:

```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva("base-classes", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: {...}
})

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean // Enables Radix Slot for polymorphic behavior
}
```

### Client Components

All hooks require `"use client"` directive. Layout components are server components by default unless they use hooks or browser APIs (see `useDarkMode.ts` for localStorage/window usage pattern).

## Styling System

### Tailwind CSS v4 with OKLCH

- Uses CSS `@theme inline` directive in `globals.css` for design tokens
- OKLCH color space for light/dark themes (not HSL)
- Custom dark mode variant: `@custom-variant dark (&:is(.dark *))`
- Radius tokens: `--radius-{sm,md,lg,xl}` all calculated from base `--radius`

When adding colors, use OKLCH format:

```css
--primary: oklch(0.205 0 0); /* Lightness Chroma Hue */
```

### CSS Variable Naming

All colors follow pattern: `--color-{name}` maps to Tailwind class `{name}` (e.g., `--color-primary` → `bg-primary`)

## Development Workflows

### Commands

- `npm run dev` - Start development server (Next.js)
- `npm run build` - Production build with type checking
- `npm run lint` - ESLint check
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check formatting without changes
- `npm run type-check` - TypeScript type checking without emitting files

### Code Quality & Linting

ESLint v9 (flat config) + Prettier configured with TypeScript and Next.js best practices. VS Code auto-formats on save.

**ESLint configuration** (`eslint.config.mjs`):
- Unused variables prefixed with `_` are allowed (e.g., `_unusedParam`)
- `console.log` warns (use `console.warn`/`console.error` for intentional logging)
- Prefer `const` over `let` where possible
- `any` types trigger warnings
- React hooks rules enforced

**Prettier configuration** (`.prettierrc`):
- 2-space indentation, semicolons enabled, double quotes
- `prettier-plugin-tailwindcss` auto-sorts Tailwind classes

**VS Code integration** (`.vscode/settings.json`):
- Auto-format on save
- ESLint auto-fix on save
- Auto-organize imports
- Tailwind IntelliSense for `cn()` and `cva()` functions

**Pre-commit workflow:**
```bash
npm run format && npm run lint && npm run type-check
```

**Recommended VS Code extensions:**
- Prettier - Code formatter (`esbenp.prettier-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript + JavaScript (`ms-vscode.vscode-typescript-next`)

### Adding shadcn Components

Reference `components.json` for configuration. New UI components should:

1. Go in `components/ui/`
2. Use `cn()` for className merging
3. Export via `components/ui/index.ts`
4. Follow CVA variant pattern if multiple styles needed

### Creating New Pages

Use App Router structure in `app/`. Each route group has `page.tsx`. Example:

```tsx
// app/games/page.tsx
export default function GamesPage() {
  return <div className="min-h-screen">Content</div>;
}
```

No need to create layout files unless route-specific layout required (root `layout.tsx` applies globally).

## Type Safety

- TypeScript strict mode enabled
- All React components should type children as `ReactNode` (see `MainLayout.tsx`)
- Prefer interface over type for component props
- Use `type` for utility types and unions

## Common Patterns

### The `cn()` Utility

**Always** use for conditional classes:

```typescript
<div className={cn("base-classes", condition && "conditional-class", className)} />
```

### Hook Patterns

Custom hooks include TypeDoc comments and generic type support (see `useDebounce.ts`):

```typescript
export function useDebounce<T>(value: T, delay: number = 500): T;
```

### Dark Mode

`useDarkMode` hook handles system preference detection and localStorage persistence. Toggles `dark` class on `document.documentElement`.
