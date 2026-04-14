# WiDS Website

Official website for WiDS (Women in Data Science). Built with Next.js 16, Payload CMS 3, and PostgreSQL.

## Stack

| Layer                | Technology                                                |
| -------------------- | --------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, React Compiler, Cache Components) |
| Runtime              | React 19                                                  |
| CMS                  | Payload CMS 3 (headless, self-hosted)                     |
| Database             | PostgreSQL (Docker for local development)                 |
| Storage              | S3-compatible object storage                              |
| Styling              | Tailwind CSS 4, shadcn/ui                                 |
| Internationalization | next-intl (English, Spanish)                              |
| Email                | React Email, Nodemailer                                   |
| Language             | TypeScript 5                                              |
| Package Manager      | pnpm                                                      |
| Code Quality         | ESLint, Prettier, Husky, lint-staged                      |

## Project Structure

```
src/
├── app/
│   ├── (payload)/              # Payload CMS admin panel and API routes
│   └── (wids)/
│       ├── [locale]/           # Locale-prefixed public pages
│       │   ├── (home)/         # Landing page
│       │   ├── about/
│       │   ├── blog/
│       │   ├── conference/
│       │   ├── datathon/
│       │   └── nextgen/
│       └── api/                # Health check, revalidation endpoints
├── features/                   # Feature-specific modules (queries, components)
│   ├── landing/
│   ├── blog/
│   └── registration/
└── shared/
    ├── components/             # Reusable UI components (header, footer, shadcn/ui)
    ├── constants/              # App-wide constants (i18n, colors, cache tags)
    ├── fonts/                  # Custom font files (Acumin Pro)
    ├── hooks/                  # Shared React hooks
    ├── lib/
    │   ├── next-intl/          # Internationalization config and routing
    │   ├── payload/            # Collections, globals, seed script, types
    │   └── react-email/        # Email templates
    ├── styles/                 # Global CSS
    └── utils/                  # Utility functions (cn, revalidation, error handling)
```

Key configuration files at the project root:

- `payload.config.ts` -- Payload CMS collections, globals, plugins, and database adapter.
- `next.config.ts` -- Next.js configuration with Payload and next-intl integrations.
- `docker-compose.yaml` -- Local PostgreSQL instance.
- `messages/` -- Translation files (`en.json`, `es.json`).

## Requirements

- [Node.js](https://nodejs.org/) v18.18 or later
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (required for the local PostgreSQL database)

## Local Development Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in the required values:

```bash
cp .env.example .env.local
```

At minimum, set the following variables for local development:

| Variable           | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `APP_URL`          | Application URL (e.g., `http://localhost:3000`)                                              |
| `PAYLOAD_SECRET`   | Any random string used to encrypt Payload tokens                                             |
| `DATABASE_URL`     | PostgreSQL connection string (e.g., `postgresql://postgres:postgres@localhost:5432/payload`) |
| `REVALIDATE_TOKEN` | Secret token for on-demand revalidation                                                      |
| `S3_*`             | S3-compatible storage credentials                                                            |
| `SMTP_*`           | SMTP server credentials for transactional email                                              |

### 3. Seed the database

This command tears down any existing local database, starts a fresh PostgreSQL container via Docker Compose, and runs the Payload seed script:

```bash
pnpm payload:seed
```

### 4. Start the development server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000). The Payload admin panel is accessible at [http://localhost:3000/admin](http://localhost:3000/admin).

## Available Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start the Next.js development server |
| `pnpm build`         | Create a production build            |
| `pnpm start`         | Run the production build             |
| `pnpm lint`          | Run ESLint                           |
| `pnpm payload:types` | Regenerate Payload TypeScript types  |
| `pnpm payload:seed`  | Reset and seed the local database    |
| `pnpm dev:email`     | Start the React Email preview server |
