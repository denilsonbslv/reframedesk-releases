# ReframeDesk — releases e site (público)

Repositório **público** `reframedesk-releases`:

- landing page na [Vercel](https://vercel.com) (pasta `public/`)
- `public/latest.json` para o app Windows checar atualização
- **GitHub Releases** com `ReframeDesk-Setup-*.exe` (sem código-fonte)

Código do produto: repo **privado** `reframedesk`.

## Vercel (grátis)

1. Importe este repositório na Vercel.
2. Framework: **Other** (`vercel.json` → `public/`).
3. Manifest: `https://<projeto>.vercel.app/latest.json`.

## CI (repo privado)

Variável `DISTRIBUTION_REPO` = `denilsonbslv/reframedesk-releases`  
Secret `DISTRIBUTION_GITHUB_TOKEN` com permissão neste repo.

Job `distribute-www` em `reframedesk/.github/workflows/release-windows.yml`.

## App instalado

```env
REFRAMEDESK_UPDATE_MANIFEST_URL=https://<projeto>.vercel.app/latest.json
REFRAMEDESK_RELEASE_PAGE_URL=https://github.com/denilsonbslv/reframedesk-releases/releases/latest
```