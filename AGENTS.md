# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Laravel application code (HTTP controllers, middleware, models, services).
- `routes/`: Web/API routes; start at `routes/web.php`.
- `resources/`: Frontend (Inertia + React, Vite, Tailwind). Entry: `resources/js/app.tsx`.
- `tests/`: Pest tests in `Feature/` and `Unit/` (e.g., `DashboardTest.php`).
- `database/`: SQLite by default (`database.sqlite`), migrations, seeders, factories.
- `public/`: Public assets; `vite` outputs are referenced via the Laravel Vite plugin.

## Build, Test, and Development Commands
- Install: `composer install && npm ci` (or `npm install`).
- Env/setup: `cp .env.example .env && php artisan key:generate`.
- Dev (full stack): `composer dev` (serves app, runs queue, logs, and Vite together).
- Frontend only: `npm run dev` (Vite dev server). Build: `npm run build`.
- Tests: `composer test` or `php artisan test` (uses Pest). Run unit/feature selectively with Pest filters.

## Coding Style & Naming Conventions
- PHP: PSR-12 via Laravel Pint. Format with `vendor/bin/pint`.
- JS/TS/React: ESLint + Prettier. Lint with `npm run lint`; format with `npm run format`; type-check with `npm run types`.
- Indentation: 4 spaces (see `.editorconfig` and `.prettierrc`).
- Naming: PHP classes `StudlyCase`, methods `camelCase`, React components `PascalCase`, files in `resources` `kebab-case.tsx/ts` when not components.

## Testing Guidelines
- Framework: Pest + Laravel. Place feature tests under `tests/Feature`, unit tests under `tests/Unit`.
- Conventions: Use Pest `test()`/`it()` style; name files `*Test.php`.
- Running: `php artisan test` for full suite. Keep tests deterministic and independent; cover services in `App\Services` and key HTTP flows.

## Commit & Pull Request Guidelines
- Commits: Use clear, imperative summaries (optionally `feat:`, `fix:`, `chore:`). Example: `fix: seed default user only if missing`.
- PRs: Include purpose, linked issues, testing steps, and screenshots for UI changes. Ensure `npm run lint`, `npm run types`, `vendor/bin/pint`, and tests pass.

## Security & Configuration Tips
- Secrets live in `.env`; do not commit it. Keep `.env.example` updated.
- Default DB is SQLite (`database/database.sqlite`). For other DBs, adjust `.env` and run `php artisan migrate`.
