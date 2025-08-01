# Admin Panel

Modern React admin panel built with TypeScript, Vite, and Mantine UI.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:prod
```

## 🛠 Tech Stack

- **Frontend**: React 19.1.1, TypeScript 5.8.3
- **Build Tool**: Vite 7.0.6
- **UI Framework**: Mantine UI 8.2.2
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: Zustand 5.0.7 & TanStack Query 5.83.0
- **HTTP Client**: Endpoint Builder 1.3.0
- **Forms**: React Hook Form 7.61.1 + Zod 4.0.14 validation
- **Routing**: TanStack Router 1.130.11
- **i18n**: i18next 25.3.2 + react-i18next 15.6.1

## 📁 Project Structure

```
src/
├── assets/             # Static assets (images, icons, styles)
│   ├── images/         # SVG icons, logos, loaders
│   └── styles/         # Global CSS files
├── components/         # Reusable UI components
│   ├── ErrorComponent.tsx
│   ├── Image/          # Optimized image component
│   ├── Loader/         # Loading components
│   ├── Preloader.tsx
│   └── VersionBadge/   # Version display
├── constants/          # Configuration and environment variables
│   ├── config.ts
│   └── env.ts
├── features/           # Feature-based modules
│   ├── auth/           # Authentication system
│   │   ├── api/        # Auth API calls
│   │   ├── hooks/      # Auth-related hooks
│   │   └── interfaces/ # Auth type definitions
│   ├── login/          # Login functionality
│   │   ├── api/        # Login API
│   │   ├── hooks/      # Login hooks & form logic
│   │   ├── interfaces/ # Login types
│   │   └── validation/ # Form validation schemas
│   ├── logout/         # Logout functionality
│   ├── modal-system/   # Global modal management
│   ├── settings-tabs/  # Settings navigation
│   ├── sidebar/        # Sidebar navigation
│   └── user-info/      # User information display
├── lib/                # Utilities and services
│   ├── cn.tsx          # Class name utilities
│   ├── color.ts        # Color utilities
│   ├── dayjs.ts        # Date formatting
│   ├── i18n.ts         # Internationalization
│   ├── logger.ts       # Logging system
│   ├── storage.ts      # Local storage utilities
│   └── utils/          # Various utility functions
├── pages/              # Route pages (TanStack Router)
│   ├── __root.tsx      # Root layout
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── settings/       # Settings pages
├── providers/          # React context providers
│   ├── mantine-provider.tsx
│   └── query-provider.tsx
└── types/              # TypeScript type definitions
    ├── api-response.d.ts
    ├── global.d.ts
    ├── utils.d.ts
    ├── vite-env.d.ts
    └── vite-virtual.d.ts
```

## 🔧 Available Scripts

| Command                  | Description                               |
| ------------------------ | ----------------------------------------- |
| `npm run dev`            | Start development server (localhost:8080) |
| `npm run prod`           | Start production server                   |
| `npm run build:checksum` | Generate checksum before every build      |
| `npm run build:dev`      | Build for development                     |
| `npm run build:staging`  | Build for staging                         |
| `npm run build:prod`     | Build for production (minified)           |
| `npm run lint`           | Run ESLint                                |
| `npm run lint:fix`       | Run ESLint with auto-fix                  |
| `npm run lint-staged`    | Lint only staged files (pre-commit)       |
| `npm run preview`        | Preview production build                  |

## 🌐 Environment Configuration

Configure API endpoints and settings in `src/constants/config.ts`:

```typescript
const DEV_CONFIG = {
	servers: {
		api: "https://api-example.com/api/v1/",
	},
	authToken: "{project_name}:admin:auth",
};
```

Environments:

- **development**: Local development
- **staging**: Staging environment
- **production**: Production environment

## 🔐 Authentication

The app uses JWT-based authentication with automatic token refresh:

```typescript
// Auth configuration in api.config.ts
class SessionStrategy implements AuthStrategy {
	async enrich(): Promise<Partial<HttpHeaders>> {
		// Authentication header enrichment
	}
}

// Storage utilities
Storage.set(CONFIG.authToken, payload);
Storage.get(CONFIG.authToken);
Storage.remove(CONFIG.authToken);
```

## 🎨 UI Components

### Mantine UI + Tailwind CSS

The project uses Mantine UI for complex components and Tailwind CSS for utility styling:

```tsx
// Example component
import { Button } from "@mantine/core";

export const MyComponent = () => (
	<Button className="bg-blue-500 hover:bg-blue-600">Click me</Button>
);
```

### Custom Components

All reusable components are in `src/components/`:

- **ErrorComponent**: Error boundary component
- **Image**: Optimized image component with loading states
- **Loader**: Loading spinner component
- **NotFoundComponent**: 404 page component
- **Preloader**: Application preloader
- **UnderDevelopment**: Development placeholder
- **VersionBadge**: Version display component

## 🔄 State Management

Using Zustand for global state management. Example modal system store:

```typescript
// features/modal-system/store/index.ts
import { createStore, useStore } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const modalSystemStore = createStore<IModalSystemState>()(
	immer(
		devtools(createModalSystemStore, {
			enabled: !isProd(),
			name: "APP (DEV)",
		}),
	),
);

export function useModalStore<T>(selector: (state: IModalSystemState) => T) {
	return useStore(modalSystemStore, selector);
}
```

## 📡 API Management

### API Client

Centralized API client with automatic auth handling:

```typescript
// api.config.ts
export const api = new HttpClient(CONFIG.servers.api);

// Usage in features
const { data } = await api.get("/users").data();
```

### TanStack Query Integration

```typescript
// features/login/hooks/useLogin.tsx
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
	return useMutation({
		mutationFn: (credentials) => loginApi(credentials),
		onSuccess: (data) => {
			// Handle success
		},
	});
};
```

## 📝 Forms & Validation

Using React Hook Form + Zod:

```typescript
// validation/login.ts
import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("Invalid email address").nonempty("Email is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.nonempty("Password is required"),
});

// Component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { register, handleSubmit } = useForm({
	resolver: zodResolver(loginSchema),
});
```

## 🌍 Internationalization

Setup with i18next:

```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Usage
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('welcome')}</h1>;
```

Locale files in `locales/`:

- `en/common.yml`

## 🧪 Code Quality

### ESLint Configuration

Modern ESLint setup with TypeScript support:

- React hooks rules
- Import sorting
- Unused imports cleanup
- TypeScript strict rules

### Pre-commit Hooks

Automatic code formatting and linting before commits:

```json
{
	"simple-git-hooks": {
		"pre-commit": "npm run lint-staged"
	}
}
```

## 🔨 Development Guidelines

### Feature Development

1. Create feature in `src/features/[feature-name]/`
2. Add API layer in `api/`
3. Create components in `components/`
4. Add hooks in `hooks/`
5. Define types in `interfaces/`
6. Add validation in `validation/`

### Component Development

1. Create component folder in `src/components/`
2. Add `index.tsx` with component
3. Add types if needed
4. Export from component folder

### Styling Guidelines

- Use Tailwind CSS for utility classes
- Use Mantine components for complex UI
- Follow mobile-first approach
- Use semantic class names

## 📦 Build & Deployment

### Build Process

```bash
# Development build
npm run build:dev

# Staging build
npm run build:staging

# Production build (minified)
npm run build:prod
```

### Build Features

- TypeScript compilation
- Vite bundling and optimization
- Checksum generation
- Environment-specific configurations
- Code splitting
- Tree shaking
