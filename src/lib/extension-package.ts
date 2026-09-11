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
    const idx = (crc ^ (bytes[i] ?? 0)) & 0xff;
    crc = (crcTable[idx] ?? 0) ^ (crc >>> 8);
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

  const blobParts = chunks.map((c) => c.slice().buffer as ArrayBuffer);
  return new Blob(blobParts, { type: "application/zip" });
}

export function generateExtensionZip(): Blob {
  const enc = new TextEncoder();
  const manifest = JSON.stringify(
    {
      manifest_version: 3,
      name: "Lovable Unlimited",
      version: "1.0.0",
      description: "Desbloqueie limites e continue criando sem pausas no Lovable.",
      permissions: ["activeTab", "storage"],
      action: { default_popup: "popup.html", default_title: "Lovable Unlimited" },
    },
    null,
    2,
  );

  const popupHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Lovable Unlimited</title>
  <style>
    * { box-sizing: border-box; }
    body {
      width: 300px;
      padding: 0;
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #07090e;
      color: #f1f5f9;
    }
    .wrap { padding: 20px; }
    .header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
    .logo {
      width: 36px; height: 36px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #8b5cf6, #06b6d4);
      font-size: 20px; font-weight: 800; color: #fff;
    }
    .title { font-size: 14px; font-weight: 700; margin: 0; }
    .sub { font-size: 11px; color: #94a3b8; margin: 2px 0 0; }
    .status {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 12px; border-radius: 12px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      font-size: 12px; font-weight: 600; color: #34d399;
      margin-bottom: 12px;
    }
    .dot { width: 8px; height: 8px; border-radius: 9999px; background: #34d399; box-shadow: 0 0 10px #34d399; }
    p { font-size: 12px; color: #94a3b8; line-height: 1.5; margin: 0 0 14px; }
    button {
      width: 100%; padding: 10px; border: none; border-radius: 10px;
      background: linear-gradient(90deg, #8b5cf6, #06b6d4);
      color: #fff; font-weight: 700; font-size: 13px; cursor: pointer;
    }
    .ver { text-align: center; font-size: 10px; color: #475569; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">∞</div>
      <div>
        <p class="title">Lovable Unlimited</p>
        <p class="sub">Produtividade + IA sem pausas</p>
      </div>
    </div>
    <div class="status"><span class="dot"></span>Unlimited Engine Active</div>
    <p>Sua extensão foi instalada com sucesso e está pronta para uso no Lovable.</p>
    <button id="btn">Abrir painel</button>
    <div class="ver">v1.0.0 • Chrome / Brave / Edge</div>
  </div>
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
