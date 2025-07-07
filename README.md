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

- **Frontend**: React 19.1.0, TypeScript 5.8.3
- **Build Tool**: Vite 7.0.2
- **UI Framework**: Mantine UI 8.1.3
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: Zustand 5.0.6
- **HTTP Client**: Axios + TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router 7.6.3
- **i18n**: i18next + react-i18next

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Image/
│   ├── Loader/
│   ├── ModalSystem/    # Modal system
│   └── VersionBadge/
├── features/           # Business logic by features
│   ├── login/          # Authentication
│   │   ├── api/        # API requests
│   │   ├── components/ # Feature components
│   │   ├── hooks/      # Custom hooks
│   │   └── validation/ # Validation schemas
│   └── sidebar/        # Sidebar
├── hooks/              # Reusable hooks
├── lib/                # Utilities and services
│   ├── color.ts
│   ├── logger/         # Logging system
│   ├── endpoint-builder/ # API endpoint builder
│   └── qs/            # Query string utilities
├── pages/              # Application pages
│   ├── auth/
│   └── dashboard/
├── providers/          # React providers
├── router/             # Routing configuration
├── store/              # Zustand state management
└── types/              # TypeScript types
```

## 🔧 Available Scripts

| Command                 | Description                               |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start development server (localhost:8080) |
| `npm run prod`          | Start production server                   |
| `npm run build:dev`     | Build for development                     |
| `npm run build:staging` | Build for staging                         |
| `npm run build:prod`    | Build for production (minified)           |
| `npm run lint`          | Run ESLint                                |
| `npm run lint:fix`      | Run ESLint with auto-fix                  |
| `npm run preview`       | Preview production build                  |

## 🌐 Environment Configuration

Configure API endpoints and settings in `src/constants/config.ts`:

```typescript
const DEV_CONFIG = {
	servers: {
		api: "https://api.example.com/api/v1",
	},
	authToken: "{{projectName}}:auth:accessToken",
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
api.addAuthInterceptors({
	getAuthPayload: () => Storage.get(CONFIG.authToken),
	setAuthPayload: (payload) => Storage.set(CONFIG.authToken, payload),
	clearAuthPayload: () => Storage.remove(CONFIG.authToken),
	refreshTokens: async (payload) => {
		// Automatic token refresh logic
	},
});
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

- **Button**: Custom button with variants
- **Image**: Optimized image component with loading states
- **Loader**: Loading spinner component
- **ModalSystem**: Global modal management
- **VersionBadge**: Version display component

## 🔄 State Management

Using Zustand for global state:

```typescript
// store/states/auth.ts
import { create } from "zustand";

interface AuthState {
	user: User | null;
	setUser: (user: User) => void;
	clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
}));
```

## 📡 API Management

### API Client

Centralized API client with automatic auth handling:

```typescript
// api.config.ts
export const api = new ApiClient(CONFIG.servers.api);

// Usage in features
const { data } = await api
	.endpoint({
		method: "GET",
		route: "/users",
	})
	.execute();
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
	email: z.string().email(),
	password: z.string().min(6),
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
   лбьдд

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
