<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Next.js 16 CLI & Tooling Invariants
- **Do NOT run `next lint`**: The `next lint` subcommand was removed in Next.js 16. Always run `eslint .` directly (or `npm run lint` which points to `eslint .`).

## App Router Layout Architecture
- **Admin Workspace Route Isolation**: Always isolate public/unauthenticated pages like `/admin/login` from protected workspaces using route groups (e.g., `app/admin/(dashboard)/layout.tsx`). Never put workspace-only sidebars or authenticated headers in the root `app/admin/layout.tsx`.
<!-- END:nextjs-agent-rules -->
