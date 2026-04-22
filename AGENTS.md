<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Project Rules
## CASE SENSITIVITY
- kebab-case for file and folder names (e.g., `my-component.js`, `user-profile/`). Use kebab-case for json keys as well (e.g., `user-name`, `email-address`).
- camelCase for variable and function names (e.g., `getUserData()`, `
- UPPER_SNAKE_CASE for constants (e.g., `API_URL`, `MAX_RETRIES`)
- PascalCase for React components (e.g., `UserProfile`, `Dashboard`)

## Project Structure
- src/app is the main Next.js application directory
- src/features contains feature-specific code (e.g., blog, landing, registration)
- src/shared contains reusable components, constants, hooks, styles, utils, and styles
- src/shared/lib contains third-party libraries and custom utilities. It includes lib configuration files.

## Libraries
- Project uses Next.js 16, tailwind, shadcn/ui and payload CMS. Always check their docs for best practices and updates.
- For emails, react-email is used. Follow its guidelines for email templates and rendering.

## UI and Styling
- The project has ready to use components on src/shared/components/ui that follow Women in Data Science directives. Use them for consistency and accessibility.
