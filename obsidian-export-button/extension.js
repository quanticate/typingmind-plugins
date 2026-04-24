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
    // Try known data-element-ids first
    const byId =
      document.querySelector('[data-element-id="settings-button"]') ||
      document.querySelector('[data-element-id="open-settings-button"]') ||
      document.querySelector('[data-element-id="settings-nav-item"]');
    if (byId) return byId;

    // Fall back to aria-label or title
    const byLabel =
      document.querySelector('[aria-label="Settings"]') ||
      document.querySelector('[title="Settings"]');
    if (byLabel) return byLabel;

    // Last resort: find a button/link containing "Settings" text in the sidebar
    const allButtons = Array.from(document.querySelectorAll('button, a'));
    return allButtons.find(b => b.textContent.trim().includes('Settings')) || null;
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
    btn.innerHTML = isIconOnly ? '&#128640;' : '&#128640; Export to Obsidian';

    btn.style.cssText = [
      'display:flex', 'align-items:center', 'justify-content:center', 'gap:6px',
      'width:100%', 'padding:8px',
      'background:transparent', 'color:inherit',
      'border:none', 'border-radius:6px',
      'cursor:pointer', 'font-size:' + (isIconOnly ? '20px' : '13px'),
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
