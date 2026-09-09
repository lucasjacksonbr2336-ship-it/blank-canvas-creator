// Pure-JS ZIP generator for bundling the Chrome Extension
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[i] = c;
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

interface ZipEntry {
  name: string;
  data: Uint8Array;
}

function createZip(files: ZipEntry[]): Blob {
  const encoder = new TextEncoder();
  const records: {
    header: Uint8Array;
    data: Uint8Array;
    nameBytes: Uint8Array;
    offset: number;
    crc: number;
    size: number;
  }[] = [];

  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const size = file.data.length;
    const fileCrc = crc32(file.data);

    const header = new Uint8Array(30);
    const view = new DataView(header.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint32(14, fileCrc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, nameBytes.length, true);

    records.push({ header, data: file.data, nameBytes, offset, crc: fileCrc, size });
    offset += 30 + nameBytes.length + size;
  }

  const centralDirStart = offset;
  const centralRecords: Uint8Array[] = [];

  for (const r of records) {
    const cdHeader = new Uint8Array(46);
    const view = new DataView(cdHeader.buffer);
    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 20, true);
    view.setUint32(16, r.crc, true);
    view.setUint32(20, r.size, true);
    view.setUint32(24, r.size, true);
    view.setUint16(28, r.nameBytes.length, true);
    view.setUint32(42, r.offset, true);

    centralRecords.push(cdHeader);
    centralRecords.push(r.nameBytes);
    offset += 46 + r.nameBytes.length;
  }

  const centralDirSize = offset - centralDirStart;
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(8, records.length, true);
  eocdView.setUint16(10, records.length, true);
  eocdView.setUint32(12, centralDirSize, true);
  eocdView.setUint32(16, centralDirStart, true);

  const chunks: Uint8Array[] = [];
  for (const r of records) {
    chunks.push(r.header, r.nameBytes, r.data);
  }
  chunks.push(...centralRecords, eocd);

  return new Blob(chunks, { type: "application/zip" });
}

export function generateExtensionZip(): Blob {
  const enc = new TextEncoder();
  const manifest = JSON.stringify(
    {
      manifest_version: 3,
      name: "Extensão Web",
      version: "1.0.0",
      description: "Extensão pronta para o seu navegador.",
      permissions: ["activeTab", "storage"],
      action: { default_popup: "popup.html" },
    },
    null,
    2,
  );

  const popupHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Extensão</title>
  <style>
    * { box-sizing: border-box; }
    body {
      width: 280px;
      padding: 20px;
      margin: 0;
      font-family: system-ui, sans-serif;
      background: #090d16;
      color: #f1f5f9;
    }
    h2 { font-size: 16px; margin: 0 0 8px; color: #38bdf8; }
    p { font-size: 13px; color: #94a3b8; line-height: 1.4; margin: 0 0 16px; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 8px;
      background: #38bdf8;
      color: #030712;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="badge">Ativo v1.0.0</div>
  <h2>Extensão Instalada</h2>
  <p>Sua extensão foi carregada com sucesso e está pronta para uso.</p>
  <button id="btn">Executar</button>
  <script src="popup.js"></script>
</body>
</html>`;

  const popupJs = `document.getElementById('btn')?.addEventListener('click', () => {
  alert('Extensão em execução com sucesso!');
});`;

  return createZip([
    { name: "manifest.json", data: enc.encode(manifest) },
    { name: "popup.html", data: enc.encode(popupHtml) },
    { name: "popup.js", data: enc.encode(popupJs) },
  ]);
}

export function triggerExtensionDownload(filename = "extensao-navegador.zip") {
  const zipBlob = generateExtensionZip();
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
