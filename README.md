# Resolve AI — Frontend

Resolve AI is an AI-powered support-ticket classification and triage application. This repository contains the React and TypeScript web client.

## Phase One capabilities

- Submit a support-ticket description for classification.
- Display the predicted category, model version, and confidence score returned by the API.
- Save classified tickets through the backend.
- Browse persisted ticket history with pagination.
- Open a ticket detail page.
- Validate form input and present loading, empty, and error states.

## Architecture

The frontend communicates with the Node.js API; it does not call the Python ML service or PostgreSQL directly.

```text
React + TypeScript
       |
       | HTTP / JSON
       v
Node.js + Express API
       |
       +----> Python FastAPI ML service
       |
       +----> PostgreSQL via Prisma
```

## Technology

- React and TypeScript
- Vite
- React Router
- TanStack Query for server state and mutations
- Axios for HTTP requests
- React Hook Form and Zod for form validation
- Tailwind CSS and shadcn/ui components

## Requirements

- A supported Node.js LTS release
- npm
- The Resolve AI backend running locally

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` in this repository:

   ```dotenv
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite.

## Build verification

```bash
npm run build
```

## API configuration

The frontend expects the backend to expose these endpoints under `VITE_API_BASE_URL`:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/predictions` | Run a prediction without saving a ticket |
| `POST` | `/tickets` | Classify and persist a ticket |
| `GET` | `/tickets?limit=10&offset=0` | List saved tickets |
| `GET` | `/tickets/:id` | Retrieve a saved ticket |

## Project structure

```text
src/
  components/
    layout/
    ui/
  features/
    predictions/
      components/
      prediction.schema.ts
    tickets/
      components/
  hooks/
  lib/
    api.ts
    query-client.ts
  pages/
    PredictionPage.tsx
    TicketDetailPage.tsx
  services/
    predictions.service.ts
    tickets.service.ts
  types/
    prediction.types.ts
    ticket.types.ts
```

## Important notes

- The confidence score is the model's reported score, not a guarantee that the prediction is correct.
- This repository is intended for local Phase One demonstration. Public deployment is planned for a later phase.

## Phase One scope

Phase One establishes the end-to-end application workflow. Future work may include improved model evaluation, richer ticket workflows, authentication and authorization, monitoring, and deployment.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
