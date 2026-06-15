# Project Development Process & Notes

## Overview
This repository contains a modern, IDE/Terminal-themed portfolio and blog application built with Next.js 16 (App Router) and Tailwind CSS. The design focuses on sleek, premium aesthetics with a strong emphasis on developer-oriented UI components (like a command palette and code syntax highlighting).

## Work Completed (Mobile Responsiveness & Polishing)

During our development sessions, we focused heavily on perfecting the mobile experience, fixing UI quirks, and polishing the codebase.

### Mobile Responsiveness Fixes
- **Global Layout**: Adjusted padding on `page.tsx` for smaller screens.
- **Navbar & CTAs**: Refactored `Navbar.tsx` and `CtaRow.tsx` to stack elements vertically (`flex-col`) on mobile to prevent overflow.
- **Terminal Hero**: Added `break-words` and adjusted padding to ensure the terminal animation text doesn't overflow mobile screens.
- **Resume Page (`app/resume/page.tsx`)**:
  - Transformed the "Download CV" button into a full-width, centered button for mobile.
  - Reorganized personal contact info into an elegant, wrapped layout.
  - **Stack Grid (`StackGrid.tsx`)**: Changed the 3-column grid into a stacked layout for mobile.
  - **Timeline (`Timeline.tsx`)**: Designed a responsive grid that keeps the vertical timeline line intact on mobile while ensuring dates remain on a single line (`whitespace-nowrap`, `tracking-tighter`).
- **Blog List (`BlogClient.tsx`)**:
  - Restructured blog cards to wrap cleanly on mobile.
  - Added an `active:` tap effect for mobile devices, mirroring the desktop `hover:` effect to provide instant touch feedback.
- **Command Palette (`CommandPaletteClient.tsx`)**:
  - Adapted the palette for mobile devices, using dynamic viewport heights (`100dvh`) to prevent virtual keyboard clipping.
  - Added missing `id`, `name`, and `autoComplete="off"` attributes to the search input to fix browser autofill warnings.

### General Maintenance & Fixes
- **Code Optimization**: Fixed linting errors across the project:
  - Removed unused variables (`node`) in `ArticleReader.tsx`.
  - Removed explicit `any` types and correctly typed the Markdown `code` component.
  - Replaced `let` with `const` in `CodeBlock.tsx`.
  - Added responsive padding and stacked footer navigation for `ArticleReader.tsx`.
- **Git Tracking**: Added the local comprehensive demo blog post (`content/blog/comprehensive-demo.md`) to `.gitignore` and removed it from the git cache to prevent it from being committed to the remote repository.

## Project Notes & Best Practices
- **Styling**: Relies on Tailwind CSS v4 and vanilla CSS variables (defined in `globals.css`). The variables handle the color palette (e.g., `--color-bg-editor`, `--color-accent`) to easily swap themes if needed.
- **State Management**: Uses React Context (`LangProvider.tsx`) for language switching.
- **Content**: Blog content is parsed from Markdown files stored in the `content/blog/` directory.

## Next Steps / Future Improvements
- Add more real content to the blog.
- Expand SEO metadata (Title tags, Open Graph images) for better indexing.
