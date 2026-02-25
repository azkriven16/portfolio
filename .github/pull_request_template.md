cat > .github/pull_request_template.md << 'EOF'
## What does this PR do?
<!-- Brief description of the changes -->

## Type of change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💄 UI/style update
- [ ] ♻️ Refactor
- [ ] 📦 DB migration
- [ ] 🔧 Config/CI change

## Checklist
- [ ] Tested locally with `pnpm dev`
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No lint errors (`pnpm lint`)
- [ ] If DB changes: `supabase db pull` run and migration committed
- [ ] If new env vars: added to `.env`, `.dev.vars`, GitHub secrets, and Wrangler secrets

## DB migrations
<!-- List any new migration files, or write "None" -->

## Screenshots (if UI changes)
<!-- Before / After screenshots -->

## Notes for reviewer
<!-- Anything specific to check or be aware of -->
EOF