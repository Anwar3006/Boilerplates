# Development Boilerplates Collection

A curated collection of production-ready boilerplates for rapid project initialization across multiple frameworks and languages. Each boilerplate contains essential configurations, best practices, and development tooling to accelerate your development workflow.

## Repository Structure

```
boilerplates/
├── frontend/
│   ├── next_boiler/
│   ├── react-vite/
│   ├── vue-nuxt/
│   ├── angular/
│   └── svelte-kit/
├── backend/
│   ├── laravel/
│   ├── django/
│   ├── fastapi/
│   ├── express-typescript/
│   ├── nestjs/
│   ├── spring-boot/
│   └── rails/
├── fullstack/
│   ├── t3-stack/
│   ├── remix/
│   └── sveltekit-drizzle/
├── mobile/
│   ├── react-native/
│   ├── flutter/
│   └── expo/
└── infrastructure/
    ├── docker-compose/
    ├── kubernetes/
    └── terraform/
```

## Quick Start

### Clone Specific Boilerplate

Instead of cloning the entire repository, you can clone only the boilerplate you need using sparse checkout:

```bash
# Clone repository without files
git clone --filter=blob:none --sparse https://github.com/Anwar3006/boilerplates.git
cd boilerplates

# Configure sparse checkout for specific boilerplate
git sparse-checkout set frontend/next_boiler

# Pull the files
git sparse-checkout reapply
```

### Alternative: Direct Directory Download

Use GitHub's download feature or degit for faster setup:

```bash
# Using degit (recommended)
npx degit Anwar3006/boilerplates/frontend/next_boiler my-nextjs-project
cd my-nextjs-project
```

```bash
# Using GitHub CLI
gh repo clone Anwar3006/boilerplates -- --depth 1
cp -r boilerplates/frontend/next_boiler my-project
cd my-project
```

## Available Boilerplates

### Frontend Frameworks

| Framework    | Directory              | Language   | Key Features                               |
| ------------ | ---------------------- | ---------- | ------------------------------------------ |
| Next.js 14   | `frontend/next_boiler` | TypeScript | App Router, Tailwind CSS, ESLint, Prettier |
| React + Vite | `frontend/react-vite`  | TypeScript | Vite, React Router, Tailwind CSS           |
| Nuxt 3       | `frontend/vue-nuxt`    | TypeScript | Vue 3, Composition API, Pinia              |
| Angular 17   | `frontend/angular`     | TypeScript | Standalone Components, Angular Material    |
| SvelteKit    | `frontend/svelte-kit`  | TypeScript | Adapter-auto, Tailwind CSS                 |

### Backend Frameworks

| Framework     | Directory                    | Language   | Key Features                           |
| ------------- | ---------------------------- | ---------- | -------------------------------------- |
| Laravel 10    | `backend/laravel`            | PHP        | Sanctum Auth, Eloquent ORM, API Routes |
| Django 4.2    | `backend/django`             | Python     | DRF, JWT Auth, PostgreSQL              |
| FastAPI       | `backend/fastapi`            | Python     | Async/Await, Pydantic, SQLAlchemy      |
| Express       | `backend/express-typescript` | TypeScript | JWT Auth, Prisma ORM, Zod Validation   |
| NestJS        | `backend/nestjs`             | TypeScript | GraphQL, TypeORM, Passport Auth        |
| Spring Boot   | `backend/spring-boot`        | Java       | Spring Security, JPA, Maven            |
| Ruby on Rails | `backend/rails`              | Ruby       | API Mode, JWT, RSpec                   |

### Full-Stack Solutions

| Stack     | Directory                     | Description                          |
| --------- | ----------------------------- | ------------------------------------ |
| T3 Stack  | `fullstack/t3-stack`          | Next.js + tRPC + Prisma + NextAuth   |
| Remix     | `fullstack/remix`             | Remix + Prisma + Tailwind CSS        |
| SvelteKit | `fullstack/sveltekit-drizzle` | SvelteKit + Drizzle ORM + Lucia Auth |

### Mobile Development

| Platform     | Directory             | Language   | Key Features                      |
| ------------ | --------------------- | ---------- | --------------------------------- |
| React Native | `mobile/react-native` | TypeScript | Navigation, AsyncStorage, Flipper |
| Flutter      | `mobile/flutter`      | Dart       | Bloc Pattern, Dio, Hive           |
| Expo         | `mobile/expo`         | TypeScript | Expo Router, Expo Vector Icons    |

### Infrastructure

| Tool           | Directory                       | Description                           |
| -------------- | ------------------------------- | ------------------------------------- |
| Docker Compose | `infrastructure/docker-compose` | Multi-service development environment |
| Kubernetes     | `infrastructure/kubernetes`     | Production-ready K8s manifests        |
| Terraform      | `infrastructure/terraform`      | AWS/GCP/Azure infrastructure as code  |

## Usage Guidelines

### 1. Choose Your Boilerplate

Navigate to the specific boilerplate directory and review the included `README.md` for framework-specific setup instructions.

### 2. Environment Setup

Each boilerplate includes:

- `.env.example` - Environment variables template
- Development and production configurations
- Database setup scripts (where applicable)
- Docker configurations for containerized development

### 3. Development Workflow

Standard commands across all boilerplates:

```bash
# Install dependencies
npm install  # or pip install -r requirements.txt, composer install, etc.

# Start development server
npm run dev  # or python manage.py runserver, php artisan serve, etc.

# Run tests
npm test     # or pytest, phpunit, etc.

# Build for production
npm run build
```

## Configuration Standards

All boilerplates follow these conventions:

### Code Quality

- **Linting**: ESLint, Pylint, RuboCop, or language-specific linters
- **Formatting**: Prettier, Black, or equivalent formatters
- **Type Safety**: TypeScript, mypy, or static type checking where available

### Security

- Environment variable management
- CORS configuration
- Authentication/Authorization setup
- Input validation and sanitization

### Performance

- Code splitting and lazy loading
- Database query optimization
- Caching strategies
- Bundle optimization

### Testing

- Unit test setup with popular testing frameworks
- Integration test examples
- Test coverage reporting
- CI/CD pipeline configurations

## Contributing

### Adding New Boilerplates

1. Create a new directory following the established structure
2. Include comprehensive `README.md` with setup instructions
3. Add `.env.example` with all required environment variables
4. Implement standard npm scripts or equivalent commands
5. Include basic test setup and examples
6. Add Dockerfile and docker-compose.yml if applicable

### Boilerplate Requirements

Each boilerplate must include:

- [ ] Detailed README with setup instructions
- [ ] Environment configuration examples
- [ ] Basic CRUD operations (for backend/fullstack)
- [ ] Authentication setup
- [ ] Error handling middleware
- [ ] Development tooling (linting, formatting)
- [ ] Test framework setup
- [ ] Production build configuration
- [ ] Docker configuration (optional but recommended)

## Maintenance

Boilerplates are regularly updated to include:

- Latest stable versions of frameworks and dependencies
- Security patches and vulnerability fixes
- Performance improvements and best practices
- Community feedback and feature requests

## License

Each boilerplate may have its own license. Please check individual directories for specific licensing information.

## Support

For issues specific to a boilerplate, please include:

- Boilerplate name and version
- Operating system and Node.js/Python/etc. version
- Complete error messages and stack traces
- Steps to reproduce the issue

---

**Quick Commands Reference:**

```bash
# Clone specific boilerplate
npx degit username/boilerplates/path/to/boilerplate my-project

# Or use sparse checkout
git clone --filter=blob:none --sparse https://github.com/username/boilerplates.git
git sparse-checkout set path/to/boilerplate
```
