# Plano para adaptar portfólio para Vercel + melhorias Vite/React (100% escalável)

## Information Gathered

- Projeto TanStack Start (Vite + React 19 + Router + shadcn/ui + tema espacial).
- Problema: Node v24 + esbuild spawn UNKNOWN (vite.config.ts @lovable.dev plugin).
- Dependências instaladas (npm install OK).
- Preview HTML funcionando com planetas animados.
- Escalável: Router code splitting, lazy components.

## Plan

1. **Fix Vite/esbuild:** Editar vite.config.ts para Vercel static (disable cloudflare/esbuild).
2. **Vercel config:** Criar vercel.json para SPA static deploy (serverless escalável).
3. **Melhorias código:** Lazy load sections, optimize images/WebP, PWA.
4. **Build/test:** `npm run build` > `npm run preview`.
5. **Deploy:** `vercel --prod`.

## Dependent Files to edit

- vite.config.ts (override plugins).
- package.json (scripts).
- vercel.json (new).
- src/routes/index.tsx (lazy imports).

## Followup steps

1. Editar arquivos.
2. Test build/preview.
3. `vercel login && vercel --prod`.

Confirma o plano para prosseguir?
