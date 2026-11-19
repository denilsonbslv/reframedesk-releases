async function loadManifest() {
  const versionEl = document.getElementById("version");
  const notesEl = document.getElementById("notes");
  const downloadEl = document.getElementById("download");
  const releasesEl = document.getElementById("releases");
  const metaEl = document.getElementById("file-meta");

  try {
    const res = await fetch("/latest.json", { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const rawVer = String(data.version || "—").replace(/^v/i, "");
    versionEl.textContent = `v${rawVer}`;

    if (data.notes) {
      notesEl.textContent = data.notes;
    } else {
      notesEl.hidden = true;
    }

    const page = data.page || data.url;
    const download = data.download;

    if (download) {
      downloadEl.href = download;
      downloadEl.textContent = `Baixar v${rawVer} (.exe)`;
      downloadEl.hidden = false;
      downloadEl.setAttribute("download", "");
    } else if (page) {
      downloadEl.href = page;
      downloadEl.textContent = "Obter instalador (GitHub Releases)";
      downloadEl.hidden = false;
      downloadEl.removeAttribute("download");
    }

    if (page) {
      releasesEl.href = page;
      releasesEl.hidden = false;
    }

    if (metaEl && (data.size || data.sha256)) {
      const parts = [];
      if (download) {
        const filename = String(download).split("/").pop();
        if (filename) parts.push(filename);
      }
      if (typeof data.size === "number" && data.size > 0) {
        const mb = (data.size / (1024 * 1024)).toFixed(1).replace(".", ",");
        parts.push(`${mb} MB`);
      }
      if (typeof data.sha256 === "string" && data.sha256.trim()) {
        parts.push(`SHA-256: ${data.sha256.trim()}`);
      }
      if (parts.length > 0) {
        metaEl.textContent = parts.join(" · ");
        metaEl.hidden = false;
      }
    }
  } catch {
    versionEl.textContent = "Indisponível";
    notesEl.textContent =
      "Não foi possível ler latest.json. Use o link de releases no GitHub.";
  }
}

loadManifest();
