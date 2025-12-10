# CLAUDE.md

## Project Overview

**Colony Report** is a concept art project built as a Next.js web application featuring a retro Windows 98-inspired user interface. The application simulates a desktop environment with draggable windows, a taskbar, menubar, and desktop icons.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with PostCSS
- **Utilities**: clsx + tailwind-merge for className composition
- **Draggable Windows**: react-draggable

## Project Structure

```
colony-report/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component (desktop)
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles & Win98 theme
│   │   └── favicon.ico
│   ├── components/
│   │   ├── colony-reports.tsx    # Main application window
│   │   └── ui/
│   │       ├── window/           # Window component system
│   │       │   ├── index.ts      # Barrel exports
│   │       │   ├── types.ts      # TypeScript interfaces
│   │       │   ├── window.tsx    # Main Window component
│   │       │   ├── window-title-bar.tsx
│   │       │   ├── window-title.tsx
│   │       │   ├── window-icon.tsx
│   │       │   ├── window-controls.tsx
│   │       │   ├── window-content.tsx
│   │       │   └── window-status-bar.tsx
│   │       ├── menubar.tsx       # Top menubar
│   │       ├── taskbar.tsx       # Bottom taskbar
│   │       ├── desktop-icon.tsx  # Desktop shortcut icons
│   │       ├── sidebar-nav.tsx   # Window sidebar navigation
│   │       └── report-content.tsx # Report display area
│   └── lib/
│       └── utils.ts          # cn() utility for classNames
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── next.config.ts
└── postcss.config.mjs
```

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture & Patterns

### Component Design

Components use a composable pattern with these conventions:

1. **Client Components**: Most UI components are client-side (`"use client"` directive)
2. **forwardRef**: Components that need ref access use `forwardRef`
3. **Props Interfaces**: Defined in separate `types.ts` files or inline
4. **cn() Utility**: All className combinations use the `cn()` helper from `@/lib/utils`

### Window System

The Window system (`src/components/ui/window/`) is the core UI framework:

- **Window**: Root container with drag support, maximize/restore state
- **WindowContext**: Provides `active`, `isMaximized`, `toggleMaximize` to children
- **WindowTitleBar**: Draggable title area (uses `.window-drag-handle` class)
- **WindowControls**: Minimize, maximize, close buttons
- **WindowStatusBar**: Bottom status display with fields

Usage pattern:
```tsx
<Window>
  <WindowTitleBar>
    <WindowTitle>TITLE</WindowTitle>
    <WindowControls onClose={handleClose} />
  </WindowTitleBar>
  {/* content */}
  <WindowStatusBar>
    <WindowStatusField>Status</WindowStatusField>
  </WindowStatusBar>
</Window>
```

### Desktop Environment

- **Menubar**: Fixed top bar with menu items (Help, View, Tools, History)
- **Taskbar**: Fixed bottom bar with Start button, open window buttons, system tray
- **DesktopIcon**: Clickable desktop shortcuts that open windows

## Styling Conventions

### Windows 98 Theme

Custom CSS variables define the Win98 color palette in `globals.css`:

| Variable | Purpose |
|----------|---------|
| `--win98-surface` | Main background (#c8b9a9 - tan) |
| `--win98-title-active` | Active window title (#8b7355 - brown) |
| `--win98-highlight` | 3D border light edge |
| `--win98-shadow` | 3D border dark edge |
| `--win98-frame` | Outermost border |

### Custom Tailwind Utilities

Beveled 3D border effects (defined with `@utility`):

- `win98-border-raised` - Raised button/window appearance
- `win98-border-sunken` - Inset/pressed appearance
- `win98-border-pressed` - Active/clicked button state
- `win98-border-status` - Status bar field borders

### Color Theme

The application uses a tan/beige/brown color palette instead of the classic Windows 98 gray. Key colors:

- Desktop background: `#6b6359` (dark brown-gray)
- Window surface: `#c8b9a9` (tan)
- Title bar: `#8b7355` (brown)

## Code Conventions

### TypeScript

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Props interfaces extend HTML attributes where applicable
- Use explicit return types for complex functions

### React

- Prefer functional components with hooks
- Use `useState` for local state management
- Spread remaining props with `...props` pattern
- Include `displayName` on forwardRef components

### Styling

- Use Tailwind classes via `cn()` for conditional styling
- Prefer theme colors (`bg-win98-surface`) over hardcoded values
- Use CSS variables for colors that might change

### File Organization

- One component per file
- Related components in directories with barrel exports (`index.ts`)
- Types in separate `types.ts` when shared across files

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main desktop page, manages window open/close state |
| `src/app/globals.css` | Win98 theme variables and utility classes |
| `src/components/colony-reports.tsx` | Primary application window |
| `src/components/ui/window/window.tsx` | Core draggable window component |
| `src/lib/utils.ts` | className merge utility |

## Known Patterns

### Opening Windows

Windows are conditionally rendered based on state in the parent page:

```tsx
const [isOpen, setIsOpen] = useState(false);

// Desktop icon opens window
<DesktopIcon onClick={() => setIsOpen(true)} />

// Window with close handler
{isOpen && <ColonyReports onClose={() => setIsOpen(false)} />}

// Taskbar shows open windows
{isOpen && <TaskbarButton title="..." />}
```

### Adding New Reports/Sections

Navigation items in `colony-reports.tsx`:
```tsx
const navItems = [
  { id: "specimen", color: "#c44", label: "Specimen" },
  // Add new items here
];
```

## Testing & Linting

- ESLint with Next.js core-web-vitals and TypeScript configs
- No test framework configured yet
- Run `npm run lint` before committing

## Notes for AI Assistants

1. **Maintain the Win98 aesthetic**: Use theme variables and border utilities
2. **Client components**: Most new UI components need `"use client"`
3. **Use cn()**: Always compose classNames with the `cn()` utility
4. **Props pattern**: Extend HTML attribute interfaces for type safety
5. **Check globals.css**: Custom utilities are defined there, not in Tailwind config
6. **Window composition**: Follow the Window component hierarchy pattern
