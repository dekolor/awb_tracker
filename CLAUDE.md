# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (React + TypeScript)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run build:ssr` - Build with SSR support
- `npm run lint` - Run ESLint with auto-fix
- `npm run types` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Backend (Laravel + PHP)
- `php artisan serve` - Start Laravel development server
- `php artisan test` - Run tests using Pest
- `php artisan migrate` - Run database migrations
- `php artisan db:seed` - Seed database with test data
- `php artisan queue:listen --tries=1` - Start queue worker
- `php artisan pail --timeout=0` - Start log monitoring
- `php artisan package:fetch-updates` - Fetch package updates from carriers

### Full Development Environment
- `composer run dev` - Start all services (server, queue, logs, vite) concurrently
- `composer run dev:ssr` - Start with SSR support
- `composer run test` - Clear config and run tests

### Code Quality
- `./vendor/bin/pint` - Format PHP code (Laravel Pint)
- `npm run lint` - Lint and fix JavaScript/TypeScript

## Architecture Overview

This is an **AWB (Air Waybill) package tracker** built with Laravel + Inertia.js + React stack:

### Backend Architecture
- **Laravel 12** with Inertia.js for SPA-like experience
- **SQLite database** with Eloquent ORM
- **Queue system** for background package updates
- **Carrier abstraction layer** via `CarrierInterface` and `CarrierManager`
- **Service pattern** for business logic (`PackageUpdateService`)

### Frontend Architecture
- **React 19** with TypeScript
- **Inertia.js** for seamless Laravel-React integration
- **Tailwind CSS v4** for styling
- **Radix UI** components for consistent UI
- **Vite** for fast development and building

### Key Models & Relationships
- `Package` (UUID primary key) belongs to `Carrier`, has many `PackageEvents`
- `PackageEvents` stores tracking history with status, location, dates
- `User` authentication with Laravel Breeze
- `Carrier` defines shipping companies (Sameday, etc.)

### Carrier Integration
- Extensible carrier system via `App\Contracts\CarrierInterface`
- Current implementation: `SamedayService` 
- New carriers register in `CarrierServiceProvider`
- Background command `FetchPackageUpdates` polls carrier APIs

### Frontend Structure
- **Pages**: Dashboard, package views, auth, settings
- **Components**: Reusable UI components in `components/ui/`
- **Layouts**: App shell with sidebar, auth layouts
- **Hooks**: Custom React hooks for appearance, mobile detection

### Database Schema
- Uses UUID primary keys for packages
- Package events track delivery history
- Carriers table defines available shipping services

## Important Notes

- Uses **SQLite** as default database
- Queue jobs handle carrier API polling
- TypeScript strict mode enabled
- Prettier + ESLint configured for consistent code style
- Uses Laravel Pint for PHP formatting
- Tests written in Pest framework