# ReframeDesk — site e canal de distribuição (público)

Repositório **público** `reframedesk-releases`:

- Landing page oficial do produto na Vercel (`public/index.html` + `public/site.css` → `https://reframedesk.vercel.app`)
- Manifesto de atualizações `public/latest.json` (canais `stable` e `beta` Early Access exclusivo para assinantes Pro Vitalício)
- **GitHub Releases** com o instalador `ReframeDesk-Setup-*.exe` (sem código-fonte proprietário)

O código-fonte do aplicativo desktop (Tauri v2 + Next.js + License API) permanece no repositório **privado** `reframedesk`.

## Vercel

1. Framework: **Other** (`vercel.json` → `public/`).
2. Manifesto consultado pelo auto-updater: `https://reframedesk.vercel.app/latest.json`.

## Canal Early Access (Beta) no `latest.json`

O script `packaging/write-latest-manifest.ps1` (do repo privado) aceita `-Channel stable` ou `-Channel beta` para publicar compilações Beta no campo `"beta"` de `public/latest.json` preservando a versão estável na raiz. Somente usuários autenticados com assinatura **Pro Vitalício** e opt-in ativo recebem builds do canal `beta`.

## CI (repo privado)

- Variável `DISTRIBUTION_REPO` = `denilsonbslv/reframedesk-releases`
- Secret `DISTRIBUTION_GITHUB_TOKEN` com permissão neste repo
- Job `distribute-www` em `reframedesk/.github/workflows/release-windows.yml`
