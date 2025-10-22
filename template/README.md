# **PROJECT_NAME**

A React application created with create-react-adam.

## Getting Started

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Available Scripts

### `npm run itDoesNotWork`

Runs basic troubleshooting checks:

- Installs dependencies
- Checks if Vite dev server is running
- Provides helpful diagnostic information

### `npm run dev`

Starts the development server with hot module replacement.

### `npm run build`

Builds the app for production. The build artifacts will be stored in the `dist/` directory.

### `npm run preview`

Previews the production build locally.

### `npm run lint`

Runs ESLint to check for code quality issues.

### `npm run format`

Formats all files with Prettier, organizing imports and sorting Tailwind classes.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint & Prettier** - Code quality and formatting

## Project Structure

```
src/
  ├── pages/          # Page components
  │   ├── Home/index.tsx
  │   └── About/index.tsx
  ├── App.tsx         # Main app with routes
  ├── main.tsx        # Entry point
  └── app.css         # Global styles (Tailwind imports)
```

## Adding New Pages

1. Create a new component in `src/pages/`
2. Import and add a route in `src/App.tsx`

Example:

```tsx
import NewPage from "./pages/NewPage";

// In the Switch component:
<Route path="/new" component={NewPage} />;
```

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Wouter Documentation](https://github.com/molefrog/wouter)
- [Tailwind CSS Documentation](https://tailwindcss.com)
