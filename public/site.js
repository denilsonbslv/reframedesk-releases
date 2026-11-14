async function loadManifest() {
  const versionEl = document.getElementById("version");
  const notesEl = document.getElementById("notes");
  const downloadEl = document.getElementById("download");
  const releasesEl = document.getElementById("releases");

  try {
    const res = await fetch("/latest.json", { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const ver = data.version || "—";
    versionEl.textContent = `v${ver.replace(/^v/i, "")}`;

    if (data.notes) {
      notesEl.textContent = data.notes;
    } else {
      notesEl.hidden = true;
    }

    const page = data.page || data.url;
    const download = data.download;

    if (download) {
      downloadEl.href = download;
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
  } catch {
    versionEl.textContent = "Indisponível";
    notesEl.textContent =
      "Não foi possível ler latest.json. Use o link de releases no GitHub quando a CI publicar.";
  }
}

loadManifest();