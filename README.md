# Trove Finance Dashboard

A modern, production-ready frontend for a financial portfolio dashboard. Built with Vite, React Router, Tailwind CSS, and React Query.

**Live Demo:** [https://trove-assessment.prnce.xyz](https://trove-assessment.prnce.xyz)

## How to run the project locally

This project uses [Bun](https://bun.sh/) as its package manager and runner, though you can also use npm.

1. **Install dependencies:**
   ```bash
   bun install
   # or npm install
   ```

2. **Start the development server:**
   ```bash
   bun run dev
   # or npm run dev
   ```

3. **Open the app:**
   Your application will be available at `http://localhost:5173`.

## Project Structure

```text
.
├── app/
│   ├── components/      # Reusable UI components (dashboard widgets, layout shells, forms)
│   ├── layouts/         # High-level route wrapper layouts (Auth, Dashboard)
│   ├── routes/          # Page-level components for React Router v7 routing
│   └── root.tsx         # Root application entry point
├── lib/
│   ├── constants/       # Hardcoded configuration (e.g., sector metadata)
│   ├── data/            # Local JSON mocks and utility data transformers
│   ├── hooks/           # Reusable react hooks
│   ├── api-client.ts    # Mock API layer simulating network latency
│   ├── schemas.ts       # Zod validation schemas for forms
│   └── utils.ts         # Generic helpers (e.g., tailwind class merging)
├── tests/               # Unit and E2E test suites (Vitest & Playwright)
└── public/              # Static assets
```

## Approach and Architectural Decisions

- **Component-Driven UI**: Built using an atomic design approach, combining smaller, reusable elements (e.g., `SearchInput`, `TransactionStatusBadge`) to construct complex dashboard views.
- **Simulated API Layer**: Abstracted data fetching into a dedicated `api-client.ts`. This allows rapid prototyping with mock JSON while maintaining a realistic asynchronous interface that can be trivially swapped out for a real backend.
- **Routing & Layouts**: React Router v7 leverages nested layouts. Separate layout shells were built for the Auth flow and Dashboard, minimizing unnecessary re-renders when navigating between routes within the same layout context.
- **State & Data Fetching**: Utilized **React Query** (`@tanstack/react-query`) to manage async data fetching, handling loading, error states, and caching gracefully.
- **Form Validation**: Form validation utilizes **Zod** for schema definitions, enabling robust server-action validation alongside progressive client-side validation for a highly responsive UX.
- **Styling**: Utilized **Tailwind CSS** to build a modern, responsive, and consistent design system, paired with `react-icons/md` for clean iconography.

## Handling Data Quirks

The mock data provided in the API (`portfolio_data.json`) included some realistic but edge-case scenarios (quirks):
- **Zero Shares**: Some holdings (like `DIS`) had `shares: 0`.
- **Zero Pricing**: Some holdings (like `NVDA`) had `currentPrice: 0`.

To handle these quirks effectively and deliver a robust user experience, I went with the following decisions:

1. **Filtering Zero Shares (`DIS`)**: Ideally, if a user holds 0 shares of an asset, they no longer own it. Therefore, it should not appear in their active "Current Holdings". So, the holdings list filters out holdings where `holding.shares <= 0` to prevent empty rows from cluttering the UI.
2. **Graceful Degradation for Zero Pricing (`NVDA`)**: If an asset is actively held but its `currentPrice` returns as `0`, it's typically a data provider downtime error. Hiding it or showing a $0.00 total loss would cause user panic. Instead, the UI renders the asset so the user knows their shares are safe, but gracefully degrades the value and percentage change fields to display "N/A" and "Price Unavailable" alongside a subtle warning icon.

## Testing

The project includes both unit and end-to-end testing:

- **Unit Tests** (`bun run test:unit`): Uses **Vitest** with **React Testing Library** and **jsdom**. Covers data utility functions (date/price formatting, procedural curve generation) and Zod validation schemas (login, register, `validateForm` helper). Run in watch mode with `bun run test:unit:watch`.
- **E2E Tests** (`bun run test:e2e`): Uses **Playwright** (Chromium) against the dev server. Covers page navigation, form rendering, and client-side validation flows. Open the interactive UI with `bun run test:e2e:ui`.
- **Run All** (`bun run test`): Runs unit tests followed by E2E tests.

## What I would improve or add with more time

1. **Real-time Updates**: Replace the simulated API delays with a real SSE connection to stream live market prices and update the portfolio value dynamically.
2. **Enhanced Error Boundaries**: Implement global and route-level error boundaries to provide better fallback UIs when data fetching fails, rather than localized inline error states.
3. **Accessibility (a11y) Audits**: While semantic HTML is used, custom interactive elements (like the filter pills or search typeahead) need proper `aria-expanded`, `aria-controls`, and `onKeyDown` handlers (specifically for `Enter` and `Space` keys) to ensure full screen-reader and keyboard navigation compliance.
4. **Detailed Tests**: Add more detailed tests for the UI components, including tests for the Transactions and holdings lists.
5. **Virtualization for Large Data Sets**: Implement windowed rendering (e.g., `@tanstack/react-virtual`) for the Transactions and Holdings lists. Rendering a lot of DOM nodes during a "View All" interaction will severely degrade performance.
6. **Component Memoization**: Heavy data transformations (like parsing chart history or filtering lists) should be wrapped in `useMemo` to prevent unnecessary recalculations during unrelated state updates.
7. **Proper Authentication**: Use a real backend authentication system using JWTs or secure session cookies to properly protect routes and manage user sessions, replacing the current mock client-side auth.
