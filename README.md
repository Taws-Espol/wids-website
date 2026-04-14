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

### 3. Start PostgreSQL

Start the local PostgreSQL database:

```bash
docker compose up -d
```

### 4. Optionally seed local data

Use the Payload seed script only when you intentionally want to insert seed data into the current database:

```bash
pnpm payload seed
```

If you want a fresh local sandbox, reset the local Docker volume first and then seed:

```bash
docker compose down -v && docker compose up -d && pnpm payload seed
```

`pnpm payload seed` is a manual operation and should not be part of a normal production deploy.

### 5. Start the development server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000). The Payload admin panel is accessible at [http://localhost:3000/admin](http://localhost:3000/admin).

## Payload Migration Workflow

This project uses PostgreSQL with Payload migrations stored in `src/shared/lib/payload/migrations`.

### Local schema workflow

1. Run local development normally with Payload/Postgres push mode.
2. Make your collection or field changes.
3. Once the schema change is ready, create a migration:

```bash
pnpm payload migrate:create your-change-name
```

4. Review the generated files in `src/shared/lib/payload/migrations`.
5. Commit the schema changes and migration files together.

Do not run migrations against your local development database if you are already using push mode there. Treat local push mode as a sandbox, then generate migrations for deployment.

### Existing baseline migration

The first generated migration in this repository is the baseline schema migration:

- `src/shared/lib/payload/migrations/20260414_203346.ts`

That migration defines the initial schema. Future migrations should only capture later schema or data transitions.

### Seeding vs migrations

Keep seed data separate from schema migrations:

- Use migrations for schema changes and transactional data transformations needed to evolve existing records safely.
- Use `pnpm payload seed` only when you explicitly want to insert bootstrap content.

## Coolify Deployment

This project runs Payload migrations as part of the build command:

```bash
pnpm build
```

That command executes:

```bash
payload migrate && next build
```

This is intentional for this SSR setup, so the database schema is up to date before the Next.js production build runs.

### Recommended commands

- Build command: `pnpm build`
- Start command: `pnpm start`

Running `pnpm build` applies any pending Payload migrations first, then executes `next build`.

### Production safety notes

- Never run `pnpm payload seed` automatically in production deploys.
- Never run `docker compose down -v && docker compose up -d && pnpm payload seed` outside local development.
- Prefer a single migration step per deploy to avoid multiple app replicas trying to migrate at the same time.

## Available Scripts

| Command          | Description                                               |
| ---------------- | --------------------------------------------------------- |
| `pnpm dev`       | Start the Next.js development server                      |
| `pnpm build`     | Run Payload migrations, then create a production build    |
| `pnpm start`     | Run the production build                                  |
| `pnpm lint`      | Run ESLint                                                |
| `pnpm payload`   | Run the Payload CLI directly, e.g. `pnpm payload migrate` |
| `pnpm dev:email` | Start the React Email preview server                      |
