(function () {
  const PROMPT = "Can you export this chat to markdown please and save it here: E:\\Data\\Obsidian\\hg_vault\\mcp\\scrap\\dump";
  const BTN_ID = 'tm-obsidian-export-btn';

  function sendPrompt() {
    const textarea =
      document.querySelector('[data-element-id="chat-input-textbox"]') ||
      document.querySelector('textarea');

    if (!textarea) {
      alert('Could not find the chat input. Please open a chat first.');
      return;
    }

    // React controlled inputs ignore direct .value assignment — this bypasses that
    const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    setter.call(textarea, PROMPT);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    setTimeout(() => {
      const submitBtn =
        document.querySelector('[data-element-id="send-button"]') ||
        document.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.click();
    }, 50);
  }

  function addButton() {
    if (document.getElementById(BTN_ID)) return;

    const anchor = document.querySelector('[data-element-id="new-chat-button-in-side-bar"]');
    if (!anchor) return;

    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.innerHTML = '&#128640; Export to Obsidian';
    btn.title = 'Export this chat to your Obsidian vault';
    btn.style.cssText = [
      'display:flex', 'align-items:center', 'gap:6px',
      'width:100%', 'padding:8px 12px', 'margin-top:6px',
      'background:transparent', 'color:inherit',
      'border:1px solid rgba(128,128,128,0.3)', 'border-radius:6px',
      'cursor:pointer', 'font-size:13px', 'text-align:left',
    ].join(';');

    btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(128,128,128,0.15)');
    btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
    btn.addEventListener('click', sendPrompt);

    anchor.parentNode.insertBefore(btn, anchor.nextSibling);
  }

  addButton();
  new MutationObserver(addButton).observe(document.body, { childList: true, subtree: true });
})();
