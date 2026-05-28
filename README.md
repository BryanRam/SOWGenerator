# SOW Generator

SOW Generator is a Next.js 14 demo application for creating pre-populated Statement of Work documents from mock SharePoint project data. It provides a project dashboard, template configuration workflow, and document preview/export experience.

## Tech stack

- Next.js 14 App Router with TypeScript
- Tailwind CSS
- Jest + React Testing Library
- `docx` for Word document generation

## What the app does

- Lists active project contexts and draft SoW activity on the dashboard
- Lets users configure SharePoint-to-template field mappings
- Shows live preview feedback for mapped and missing fields
- Renders a full Statement of Work document view with validation and export actions
- Generates a real `.docx` file and supports PDF export through browser print

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Running tests

```bash
npm test
```

## Production build

```bash
npm run build
```

## Application structure

- `app/layout.tsx` – shared sidebar, top navigation, and shell
- `app/page.tsx` – dashboard with stats and project table
- `app/projects/page.tsx` – project listing view
- `app/templates/[id]/page.tsx` – template configuration and mapping review
- `app/projects/[id]/page.tsx` – full SoW document preview and export experience
- `app/components/` – reusable UI pieces
- `app/data/mockData.ts` – mock SharePoint data, template content, and helper data
- `app/utils/templateEngine.ts` – placeholder parsing and replacement logic
- `__tests__/` – component, page, and utility tests

## Template engine

Templates use `{{FIELD_NAME}}` syntax. The template engine:

- detects placeholders with a regex matcher
- replaces mapped values with project data
- preserves unresolved placeholders when required data is missing
- creates segment metadata so the UI can style mapped values in blue and missing fields in red

## Adding new templates

1. Add a new template string and metadata in `app/data/mockData.ts`
2. Add placeholder values for the relevant project record
3. Update any mapping rows required by the configuration screen
4. Reuse `replaceTemplatePlaceholders` to generate previews and exports

## CI/CD workflow

GitHub Actions is configured in `.github/workflows/ci.yml` to:

1. install dependencies with `npm ci`
2. build the Next.js application
3. run the Jest suite with coverage enabled

## Screenshots description

- **Dashboard:** white cards on a light gray workspace with active project metrics and a paginated table
- **Template configuration:** field-mapping table with validation messaging and a live preview panel
- **SOW document view:** large document preview surface with export, validation, and activity side panels
