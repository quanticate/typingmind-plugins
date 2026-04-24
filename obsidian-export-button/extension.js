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

  function findSettingsButton() {
    return document.querySelector('[data-element-id="workspace-tab-settings"]') || null;
  }

  function addButton() {
    if (document.getElementById(BTN_ID)) return;

    const settingsBtn = findSettingsButton();
    if (!settingsBtn) return;

    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.title = 'Export this chat to your Obsidian vault';

    // Mirror the layout of the sidebar nav buttons (icon column — likely icon-only)
    const isIconOnly = settingsBtn.offsetWidth < 60;
    btn.innerHTML = isIconOnly
      ? '<span style="font-size:20px;line-height:1;">&#128640;</span><span style="font-size:11px;margin-top:2px;">Export</span>'
      : '&#128640; Export to Obsidian';

    btn.style.cssText = [
      'display:flex', 'flex-direction:column', 'align-items:center', 'justify-content:center', 'gap:0',
      'width:100%', 'padding:8px 4px',
      'background:transparent', 'color:inherit',
      'border:none', 'border-radius:6px',
      'cursor:pointer', 'font-size:13px',
      'margin-bottom:4px',
    ].join(';');

    btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(128,128,128,0.15)');
    btn.addEventListener('mouseleave', () => btn.style.background = 'transparent');
    btn.addEventListener('click', sendPrompt);

    settingsBtn.parentNode.insertBefore(btn, settingsBtn);
  }

  addButton();
  new MutationObserver(addButton).observe(document.body, { childList: true, subtree: true });
})();
