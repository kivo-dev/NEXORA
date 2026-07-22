# DEVELOPMENT_GUIDE.md

# Nexora Development Guide

**Version:** 1.0
**Date:** July 17, 2026
**Status:** Final Engineering Guideline

---

## 1. Development Philosophy

### Product-First Development
Every engineering decision must serve the product goal: delivering AI-powered financial intelligence to Stellar users. Features are validated against user needs before implementation. We build what matters, not what's technically interesting.

### MVP Mindset
We have 37 days. This means:
- **Build the core, not the edge.** Deliver 80% value with 20% effort.
- **Ship fast, iterate faster.** Imperfect but functional beats perfect but nonexistent.
- **Cut ruthlessly.** If it's not in the MVP requirements, it waits for v2.
- **Quality in critical paths.** Security, user data, and financial transactions have zero compromise.

### Clean Architecture Principles
We balance architectural purity with practical speed:
- **Separation of concerns:** UI, business logic, and data access remain distinct.
- **Dependency direction:** Dependencies point inward (UI → Business Logic → Data).
- **Testability:** Core logic is framework-agnostic and testable without external services.
- **Pragmatic approach:** We don't over-engineer. We refactor when patterns emerge.

### Speed vs Scalability Balance
- **Days 1-15:** Focus on speed. Get features working. Validate assumptions.
- **Days 16-30:** Focus on quality. Refine, test, stabilize.
- **Days 31-37:** Focus on polish. Performance, security, deployment.
- **Scalability:** Design for growth but implement for current needs. Use patterns that can scale (services, caching, async processing) but don't optimize prematurely.

---

## 2. Final Technology Stack

### Frontend
**Framework:** Next.js 14 (App Router)
- **Why:** Server-side rendering for SEO, API routes for lightweight backend, built-in optimizations, and React ecosystem.

**Language:** TypeScript
- **Why:** Type safety, better IDE support, reduced runtime errors.

**Styling:** Tailwind CSS
- **Why:** Utility-first, rapid development, consistent design system integration.

**UI Libraries:**
- **shadcn/ui:** Component primitives built on Radix UI. Customizable, accessible.
- **Radix UI:** Headless components for accessibility and interaction.
- **Lucide Icons:** Consistent icon system.

**State Management:**
- **Zustand:** Global state (user, wallet, app settings).
- **React Query (TanStack Query):** Server state caching, data fetching, mutations.
- **React Context:** Theming, user preferences, feature flags.

### Backend
**Framework:** Python FastAPI
- **Why:** High performance, async support, automatic OpenAPI docs, type validation with Pydantic.

**Language:** Python 3.11+
- **Why:** AI ecosystem maturity, readability, fast development.

**API Approach:** RESTful with OpenAPI specification
- **Why:** Simplicity, broad tooling support, clear documentation.
- **Future:** GraphQL can be added later if needed.

**Authentication:**
- **JWT-based authentication** with refresh tokens.
- **Session management** with HttpOnly cookies for security.
- **Stellar Account integration** as primary identity.

**API Structure:**
```
/api/v1/                  - API versioning from day one
  /auth/                  - Authentication endpoints
  /wallet/                - Wallet connection, balance, transactions
  /portfolio/             - Portfolio analysis, position tracking
  /insights/              - AI-powered insights, market analysis
  /reports/               - Report generation and storage
  /webhooks/              - Stellar event webhooks
```

### Database
**Primary Database:** PostgreSQL 15+
- **Why:** Reliable ACID compliance, JSON support for flexible data, strong ecosystem.

**Caching:** Redis
- **Why:** Session storage, rate limiting, cached AI responses.

**Data Handling:**
- **SQLAlchemy 2.0+ (Async):** ORM with async support.
- **Alembic:** Migration management.
- **Pydantic:** Data validation between API and database.

### AI
**LLM Integration:** OpenRouter API
- **Why:** Single API for multiple models. Can switch between models without code changes.

**Primary Model:** claude-3.5-sonnet
- **Why:** Strong reasoning, financial context understanding, cost-effectiveness.

**Fallback:** gpt-4o-mini (for cost-sensitive operations)

**AI Approach:**
- **Structured Prompting:** Consistent prompt templates with clear output schemas.
- **RAG Architecture:** Source data → Context Building → LLM Processing → Structured Output.
- **Response Validation:** JSON schema validation on all AI outputs.
- **Caching Layer:** Similar queries get cached responses (1-hour TTL).

### Blockchain
**Stellar SDK:** stellar-sdk (Python) / stellar-sdk (JavaScript)
- **Why:** Official SDKs, well-maintained, comprehensive.

**Horizon API:** Stellar public Horizon endpoint (with fallback)
- **Why:** Standard API for blockchain data.

**Network:** Stellar Mainnet (Production) / Testnet (Development)

**Key Operations:**
- Wallet connection (account creation, key management)
- Balance checking (native + trustlines)
- Transaction history (payment paths, operations)
- Asset information (issuers, anchors)

---

## 3. Project Structure

```
Nexora/
├── frontend/                        # Next.js application
│   ├── app/                         # App Router pages and layouts
│   │   ├── (auth)/                  # Authentication routes (login, signup)
│   │   ├── (dashboard)/             # Protected routes (authenticated users)
│   │   ├── api/                     # Next.js API routes (lightweight)
│   │   ├── layout.tsx               # Root layout
│   │   └── providers.tsx            # Context providers
│   ├── components/                  # React components
│   │   ├── ui/                      # shadcn/ui base components
│   │   ├── common/                  # Shared components (navbar, footer)
│   │   ├── dashboard/               # Dashboard-specific components
│   │   ├── portfolio/               # Portfolio components
│   │   ├── insights/                # AI insights components
│   │   └── reports/                 # Report components
│   ├── lib/                         # Utilities and helpers
│   │   ├── api/                     # API client functions
│   │   ├── stellar/                 # Stellar SDK wrappers
│   │   ├── utils/                   # General utilities
│   │   └── validators/              # Input validation
│   ├── store/                       # Zustand stores
│   │   ├── userStore.ts
│   │   ├── walletStore.ts
│   │   └── appStore.ts
│   ├── hooks/                       # Custom React hooks
│   │   ├── useWallet.ts
│   │   ├── useStellarData.ts
│   │   └── useAuth.ts
│   ├── types/                       # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── stellar.ts
│   │   └── index.ts
│   ├── styles/                      # Global styles (Tailwind)
│   ├── public/                      # Static assets
│   ├── .env.local                   # Environment variables
│   └── package.json
│
├── backend/                         # FastAPI application
│   ├── app/
│   │   ├── api/                     # API routes
│   │   │   ├── v1/                  # Version 1 API
│   │   │   │   ├── endpoints/       # Route definitions
│   │   │   │   │   ├── auth.py
│   │   │   │   │   ├── wallet.py
│   │   │   │   │   ├── portfolio.py
│   │   │   │   │   ├── insights.py
│   │   │   │   │   └── reports.py
│   │   │   │   └── dependencies.py  # FastAPI dependencies
│   │   │   └── __init__.py
│   │   ├── core/                    # Core business logic
│   │   │   ├── auth/                # Authentication logic
│   │   │   ├── stellar/             # Stellar operations
│   │   │   ├── portfolio/           # Portfolio analysis
│   │   │   ├── ai/                  # AI processing
│   │   │   └── reports/             # Report generation
│   │   ├── models/                  # SQLAlchemy models
│   │   │   ├── user.py
│   │   │   ├── wallet.py
│   │   │   ├── portfolio.py
│   │   │   ├── report.py
│   │   │   └── insight.py
│   │   ├── schemas/                 # Pydantic schemas
│   │   │   ├── auth.py
│   │   │   ├── wallet.py
│   │   │   ├── portfolio.py
│   │   │   └── insights.py
│   │   ├── services/                # External service integrations
│   │   │   ├── ai_service.py
│   │   │   ├── stellar_service.py
│   │   │   └── cache_service.py
│   │   ├── utils/                   # Utilities
│   │   │   ├── security.py
│   │   │   ├── logging.py
│   │   │   └── config.py
│   │   └── main.py                  # FastAPI application entry
│   ├── migrations/                  # Alembic migrations
│   ├── tests/                       # Test suite
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/
│   ├── .env                         # Environment variables
│   ├── requirements.txt
│   ├── docker-compose.yml
│   └── Dockerfile
│
├── docs/                            # Documentation
│   ├── PRODUCT_REQUIREMENTS.md
│   ├── USER_FLOW.md
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── WIREFRAMES.md
│   ├── DESIGN_SYSTEM.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── MVP_BUILD_PLAN.md
│   └── DEVELOPMENT_GUIDE.md (this file)
│
├── .github/                         # GitHub configurations
│   └── workflows/                   # CI/CD pipelines
│       ├── ci.yml
│       └── deploy.yml
│
├── .gitignore
├── README.md
└── LICENSE
```

### Folder Responsibilities

| Folder | Responsibility |
|--------|---------------|
| **frontend/** | All client-side code. User interface, interactions, client state. |
| **backend/** | All server-side code. Business logic, data processing, external integrations. |
| **docs/** | All project documentation. Source of truth for requirements and architecture. |
| **.github/** | CI/CD pipelines, PR templates, automation. |

---

## 4. Coding Standards

### Code Organization
- **One file, one responsibility.** Each file should export a single primary function or component.
- **Max 300 lines per file.** If it grows beyond, split into smaller files.
- **Index files** for exporting multiple related modules.
- **Absolute imports** using aliases (`@/` for frontend, `app.` for backend).

### Naming Conventions

**Frontend:**
- **Components:** PascalCase (e.g., `UserProfile.tsx`, `PortfolioChart.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useWallet.ts`, `useAuth.ts`)
- **Functions:** camelCase (e.g., `formatCurrency`, `calculateROI`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `STELLAR_NETWORK`)
- **Variables:** camelCase (e.g., `userBalance`, `transactionHistory`)

**Backend:**
- **Models:** PascalCase (e.g., `User`, `Portfolio`, `Transaction`)
- **Schemas:** PascalCase with `Schema` suffix (e.g., `UserSchema`, `PortfolioSchema`)
- **Services:** camelCase with `Service` suffix (e.g., `aiService`, `stellarService`)
- **Functions:** snake_case (e.g., `get_user_portfolio`, `calculate_market_value`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `CACHE_TTL`)

**Database:**
- **Tables:** snake_case, plural (e.g., `users`, `transactions`, `portfolios`)
- **Columns:** snake_case (e.g., `user_id`, `created_at`, `stellar_address`)
- **Foreign Keys:** `{singular_table}_id` (e.g., `user_id`, `portfolio_id`)
- **Primary Keys:** `id` (UUID for PostgreSQL)

### File Naming
- **Frontend:** `.tsx` for components, `.ts` for utilities, `.css` for styles
- **Backend:** `.py` for all files
- **Tests:** `{file_name}.test.ts` or `test_{module}.py`

### Component Structure
```tsx
// 1. Imports (external, internal, type imports)
// 2. Type definitions
// 3. Component function
// 4. Hooks and state
// 5. Effects
// 6. Handlers
// 7. Render
// 8. Export
```

### Documentation Rules
- **Every API endpoint** has OpenAPI documentation.
- **Every public function** has JSDoc/docstring comments.
- **Complex business logic** has inline comments explaining "why".
- **README.md** updated with every significant change.
- **No dead code.** Remove commented code before committing.

---

## 5. Frontend Development Rules

### Component Architecture
- **Atomic Design:** Atoms → Molecules → Organisms → Templates → Pages.
- **Presentational vs Container:** Use hooks for logic, components for UI.
- **Reusable Components:** Build generic components before specific ones.
- **Component Props:** Use TypeScript interfaces with JSDoc comments.

### State Management
- **Zustand (Global):** User session, wallet connection, app settings.
- **React Query (Server):** All API data with caching and background refetching.
- **React Context (Local):** Theme, feature flags, current view preferences.
- **useState/useReducer (Local):** Component-specific UI state.

**Golden Rule:** If state is shared across components, move to global store. If it's server data, use React Query. If it's local UI state, keep it in the component.

### API Communication
- **Centralized API client** using `fetch` or `axios`.
- **React Query hooks** for all data fetching.
- **Error handling** with toast notifications.
- **Loading states** for all async operations.
- **Optimistic updates** for mutations (where applicable).

### Responsive Implementation
- **Mobile-first development.** Design for mobile, enhance for desktop.
- **Tailwind breakpoints:** `sm`, `md`, `lg`, `xl`, `2xl`.
- **No fixed widths.** Use percentages, `max-w-`, and flexbox/grid.
- **Touch-friendly inputs** (minimum 44px tap targets).

### Design System Usage
- **Use shadcn/ui primitives** for all UI components.
- **Customize via Tailwind theme** (colors, spacing, fonts).
- **No custom CSS.** Use Tailwind utilities.
- **Follow DESIGN_SYSTEM.md** for colors, typography, and spacing.

---

## 6. Backend Development Rules

### API Organization
- **Versioned APIs:** `/api/v1/` from day one.
- **Resource-based endpoints:** `/users/`, `/portfolios/`, `/insights/`.
- **HTTP methods:** GET (read), POST (create), PUT (update), DELETE (remove).
- **Status codes:** 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).
- **Consistent error format:** `{"error": "message", "code": "ERROR_CODE"}`.

### Service Structure
- **Separation of concerns:** API layer → Service layer → Data layer.
- **Dependency injection** for services (FastAPI dependencies).
- **Service methods** are async where possible.
- **Services** are stateless.

### Data Processing Flow
1. **Request** → 2. **Validation (Pydantic)** → 3. **Authorization** → 4. **Business Logic** → 5. **Data Access** → 6. **Response**

### Error Handling
- **Global exception handler** for consistent responses.
- **Custom exceptions** for domain-specific errors.
- **Log all errors** with context for debugging.
- **User-friendly messages** for public-facing errors.

### Security Practices
- **Environment variables** for all secrets.
- **JWT tokens** with expiration and refresh.
- **CORS** properly configured for frontend domain.
- **Rate limiting** on public endpoints.
- **Input validation** on all user inputs.
- **SQL injection prevention** via ORM/parameterized queries.
- **CSRF protection** for forms.
- **HTTPS only** in production.

---

## 7. Database Guidelines

### Data Modeling Principles
- **Normalize to 3NF** (Third Normal Form) by default.
- **Denormalize only** for performance-critical queries (with documentation).
- **UUID primary keys** (for security, easier merging).
- **Soft deletes** using `deleted_at` column (avoid data loss).
- **Audit fields** on all tables: `created_at`, `updated_at`.

### Naming Conventions
- **Tables:** snake_case, plural.
- **Columns:** snake_case.
- **Primary Keys:** `id` (UUID).
- **Foreign Keys:** `{singular_table}_id`.
- **Timestamps:** `created_at`, `updated_at`, `deleted_at`.
- **Boolean fields:** `is_{adjective}` (e.g., `is_active`, `is_verified`).

### Relationship Structure
- **One-to-Many:** Foreign key on the "many" side.
- **Many-to-Many:** Junction table with both foreign keys.
- **One-to-One:** Foreign key on either side (usually the optional side).
- **Eager loading** for related data (avoid N+1 queries).

### Migration Strategy
- **Alembic** for all schema changes.
- **Migration files** are version-controlled.
- **Down migrations** always provided (rollback capability).
- **Run migrations** as part of deployment process.
- **No manual schema changes** on production.

---

## 8. AI Development Guidelines

### How AI Should Receive Data
- **Context building:** Gather relevant data (portfolio, market data, user preferences).
- **Structured input:** Always provide data in JSON format.
- **Prompt templates:** Consistent prompts with placeholders for dynamic data.
- **Query categorization:** Financial analysis, market trends, portfolio optimization, risk assessment.

### Prompt Organization
```python
prompt_template = """
You are a financial intelligence expert. Analyze the following data and provide insights.

[Context]
{context}

[Data]
{data}

[Instructions]
{instructions}

[Output Format]
{output_schema}
"""
```

### AI Output Structure
- **JSON output only** (no free text).
- **Pydantic schemas** for validation.
- **Confidence scoring** on predictions.
- **Source attribution** for all recommendations.
- **Risk classification** (low, medium, high) for suggestions.

### Preventing Hallucination
- **System prompt:** "Only base your answers on the provided context. If information is missing, state that clearly."
- **Temperature:** 0.3 (low creativity, high determinism).
- **Context limitation:** Include only relevant data in prompt.
- **Fact-checking layer:** Validate AI outputs against known data.
- **Uncertainty handling:** Return "insufficient data" instead of guessing.

### Source-Based Recommendations
- **Every AI recommendation** must cite the source data it's based on.
- **Attribution format:** "Based on [source] data from [date]".
- **Original data** included in response for verification.

---

## 9. Stellar Integration Guidelines

### Wallet Connection Rules
- **Only the user's private key** should be stored in the backend (encrypted).
- **Frontend never stores** private keys in plain text.
- **Session-based wallet access:** User authenticates, wallet data fetched from backend.
- **Stellar account validation:** Verify account exists before connecting.
- **Multiple wallet support:** User can have multiple Stellar accounts associated.

### Blockchain Data Handling
- **Horizon API calls** with exponential backoff for rate limits.
- **Data caching** to reduce Horizon calls (5-minute TTL on balances, 1-hour on history).
- **Balance caching** with Redis.
- **Transaction parsing** to extract meaningful data (amounts, assets, trustlines).
- **Asset information** fetched from Stellar TOML files where available.

### Transaction Processing
- **Transaction builder** pattern for creating operations.
- **Pre-flight checks:** Validate balances, trustlines, and sequence numbers before submission.
- **Transaction monitoring:** Track submitted transactions to confirm finality.
- **Error handling:** Specific error messages for common failures (insufficient balance, trustline missing, etc.).

### Security Considerations
- **Keys never logged** or transmitted in plain text.
- **Network validation:** Validate network passphrases match environment.
- **CSRF protection** on wallet operations.
- **Rate limiting** on transaction submissions.
- **Memo field usage** for identifying user transactions.

---

## 10. Environment Setup

### Required Development Environment
- **Node.js:** v18.17+ (LTS)
- **Python:** v3.11+
- **PostgreSQL:** v15+
- **Redis:** v7+
- **Docker:** v24+ (optional, recommended)
- **Git:** v2.40+
- **IDE:** VSCode with recommended extensions

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXTAUTH_SECRET=<random_secret>
NEXTAUTH_URL=http://localhost:3000
```

**Backend (.env):**
```
DATABASE_URL=postgresql://user:pass@localhost:5432/nexora
REDIS_URL=redis://localhost:6379/0
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
OPENROUTER_API_KEY=<your_key>
OPENROUTER_MODEL=claude-3.5-sonnet
JWT_SECRET=<random_secret>
JWT_EXPIRATION_MINUTES=60
```

### Local Setup Principles
1. **Clone repository** → 2. **Install dependencies** → 3. **Set up database** → 4. **Run migrations** → 5. **Seed initial data** → 6. **Start services** → 7. **Verify with health checks**

**Docker setup** recommended for consistent development environments.

---

## 11. Git Workflow

### Branch Strategy
- **main:** Production-ready code. Only merged via PR.
- **develop:** Integration branch for features. All feature branches merge here.
- **feature/{name}:** New features from develop.
- **fix/{name}:** Bug fixes from develop or main.
- **release/{version}:** Release preparation from develop.

### Commit Style (Conventional Commits)
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Example:**
```
feat(portfolio): add portfolio value calculation endpoint

Implements /api/v1/portfolio/value endpoint with real-time Stellar data.

Closes #42
```

### Version Control Rules
- **No direct commits to main or develop.**
- **PR requires:** ✅ Passing CI, ✅ At least one review, ✅ No merge conflicts.
- **Commits small and focused** (one logical change per commit).
- **Pull requests** with description, test results, and screenshots (where applicable).

---

## 12. Development Order

### Phase 1: Foundation (Days 1-5)
1. **Project initialization:** Repository setup, CI/CD configuration, local development environment.
2. **Frontend foundation:** Next.js app, Tailwind, shadcn/ui, routing structure, providers.
3. **Backend foundation:** FastAPI setup, database connection, migration system.

### Phase 2: Core Features (Days 6-18)
4. **Authentication system:** Sign up, login, session management, protected routes.
5. **Wallet connection:** Stellar wallet integration, balance display, account management.
6. **Stellar data integration:** Horizon API connectivity, transaction history, asset data.
7. **Database models and migrations:** Users, wallets, portfolios, transactions.

### Phase 3: AI Integration (Days 19-26)
8. **AI analysis engine:** OpenRouter integration, prompt templates, response parsing.
9. **Portfolio insights:** AI-powered portfolio analysis, market trends, risk assessment.
10. **Dashboard:** Real-time portfolio view, key metrics, quick actions.

### Phase 4: Advanced Features (Days 27-32)
11. **AI Report:** Detailed report generation with PDF export.
12. **Transaction history:** Full transaction view with filtering and search.

### Phase 5: Polish and Release (Days 33-37)
13. **Testing:** Unit tests, integration tests, end-to-end tests.
14. **Security audit:** API security review, vulnerability scanning.
15. **Performance optimization:** Caching, lazy loading, performance monitoring.
16. **Deployment configuration:** Docker setup, deployment scripts, monitoring.

---

## 13. First Development Tasks

### Task 1: Repository Initialization
- Initialize Git repository
- Set up README.md
- Configure .gitignore
- Create GitHub repository
- Set up branch protection rules

### Task 2: Frontend Setup
- Initialize Next.js with TypeScript
- Install and configure Tailwind CSS
- Set up shadcn/ui (install base components)
- Create base layout and routing structure

### Task 3: Backend Setup
- Initialize FastAPI with Python
- Set up virtual environment and requirements
- Configure database connection
- Create health check endpoint

### Task 4: Authentication Setup
- Implement JWT-based auth on backend
- Create login, register, and profile endpoints
- Implement frontend auth flow with React Query
- Set up protected routes and middleware

### Task 5: Wallet Connection (Frontend)
- Install Stellar SDK
- Create wallet connection UI component
- Implement wallet connection flow (with demo/testnet key)
- Display wallet balance and public key

### Task 6: Wallet Connection (Backend)
- Implement Stellar service for account operations
- Create wallet endpoints (balance, info)
- Handle Horizon API integration

### Task 7: Database Setup
- Define initial SQLAlchemy models
- Create Alembic migration
- Run migrations
- Seed test data

### Task 8: Portfolio Foundation
- Design portfolio data structure
- Create portfolio endpoints (GET, POST)
- Implement basic portfolio calculations (total value, asset allocation)
- Create portfolio display components

### Task 9: AI Service Setup
- Configure OpenRouter integration
- Create basic prompt templates
- Implement analysis endpoint
- Add caching layer

### Task 10: Dashboard UI
- Design dashboard layout
- Implement portfolio overview widgets
- Add real-time data refresh
- Ensure responsive design

---

## 14. Definition of Done

A feature is considered **complete** when ALL of the following criteria are met:

### Functionality
- ✅ All user stories from the requirements are implemented.
- ✅ Feature works across all supported browsers (Chrome, Firefox, Safari, Edge).
- ✅ Edge cases are handled gracefully (empty states, error states).
- ✅ API endpoints return correct data with proper status codes.

### Testing
- ✅ Critical path tests pass (unit tests for core logic).
- ✅ API endpoints tested (integration tests for critical endpoints).
- ✅ Manual testing completed by developer (all acceptance criteria verified).
- ✅ No critical or high-severity bugs in bug tracking.

### UX Consistency
- ✅ Follows DESIGN_SYSTEM.md (colors, typography, spacing).
- ✅ Responsive (works on mobile, tablet, desktop).
- ✅ Loading states, error states, and success states implemented.
- ✅ Accessible (keyboard navigable, proper ARIA labels).

### Code Quality
- ✅ Code follows coding standards (naming, structure, documentation).
- ✅ No console logs, commented code, or unused imports.
- ✅ Pull request reviewed and approved.
- ✅ CI pipeline passes (linting, type checking, tests).
- ✅ Documentation updated (README, API docs, comments).

---

## 15. Rules For AI Coding Assistants

### How to Provide Context
**ALWAYS include:**
- Relevant code snippet (with line numbers if possible)
- Purpose of the code (what it should do)
- Context (where it lives in the project)
- Current behavior (what it's doing wrong)
- Desired behavior (what it should do)

**NEVER:**
- Send entire files without specific sections
- Send code without explaining the goal
- Omit error messages or stack traces

### How to Request Code
**Structure your request:**
```
[Context/Background]
- What we're building
- Where it fits in the project
- Existing relevant code

[Task]
- What needs to be implemented
- Inputs and outputs
- Constraints or requirements

[Preferences]
- Preferred style/approach
- Any patterns to follow
- Any patterns to avoid
```

### How to Review Generated Code
**Before accepting AI-generated code:**
1. ✅ Understand every line of code.
2. ✅ Verify it integrates with existing code.
3. ✅ Check for security vulnerabilities.
4. ✅ Confirm it follows project patterns.
5. ✅ Test it (at least manually).
6. ✅ Refactor for clarity if needed.

**NEVER** copy-paste code without understanding it.

### What AI Should NOT Decide Alone
- **Architecture decisions** (AI can suggest, senior dev decides)
- **Security implementations** (AI can help, must be reviewed)
- **Database schema changes** (AI can suggest, DBA/lead reviews)
- **Third-party library choices** (team evaluates, decisions documented)
- **Deployment configurations** (team agrees, documented)
- **Design system changes** (follow existing design system)

### AI Usage Best Practices
- **Use AI for:** Boilerplate, repetitive patterns, utility functions, test generation, refactoring suggestions.
- **Don't use AI for:** Authentication logic, security-critical code, financial calculations (without review), database migrations (without review).
- **Documentation:** All AI-generated code must be reviewed by a human before committing.

---

## Final Note

This document is the **source of truth** for how we build Nexora. Every team member is expected to read and follow these guidelines.

**When in doubt:** Open a discussion, ask a lead, or update this document with a PR.

**Remember:** We're building a real product for real users in 37 days. Focus, prioritize, and ship.

---

**Version History:**
- v1.0 (July 17, 2026): Initial release.

**Document Owner:** Engineering Team
**Next Review:** After MVP launch (September 2026)