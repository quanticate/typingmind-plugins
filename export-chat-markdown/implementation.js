async function export_chat_to_markdown({ content, filename }, userSettings, resources) {
  const date = new Date().toISOString().split('T')[0];
  const safeFilename = (filename || `chat-export-${date}`).replace(/[^a-z0-9_-]/gi, '-');
  const exportFilename = `${safeFilename}.md`;

  // Base64 data URI — the only reliable download method in a sandboxed iframe
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const dataUri = `data:text/markdown;charset=utf-8;base64,${encoded}`;

  return `<div style='font-family:sans-serif;padding:12px;'>
  <a href='${dataUri}' download='${exportFilename}'
     style='display:inline-flex;align-items:center;gap:8px;padding:10px 18px;background:#2563eb;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;'>
    &#11015; Download ${exportFilename}
  </a>
  <p style='margin:8px 0 0;font-size:12px;color:#6b7280;'>
    Click to save the full conversation as a Markdown file.
  </p>
</div>`;
}
