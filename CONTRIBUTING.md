# Contributing

Thanks for your interest in improving DeepSeek web chat for DeepSeek Harness (DSH).

## Before you start

- This is a **desktop-only** DSH bundle. It relies on the desktop preload's webview lease (`window.dshDesktop.browser.acquire`); the browser build cannot embed `chat.deepseek.com` because the site sends `frame-ancestors 'none'`.
- The plugin is intentionally dependency-free: `client.js` runs as a plain module through `window.__ModuleLoader__`, so do not add bundlers, frameworks, or npm runtime dependencies without discussing it first.

## Development setup

```bash
git clone https://github.com/wenshiyu123/dsh-deepseek-web-chat.git
cd dsh-deepseek-web-chat
node --check client.js
```

Install the directory as a bundle in a DSH **desktop** profile (Settings → Plugins → Add plugin, or the `plugin_manager` tool). Client changes usually require a full DSH restart; closing the window only hides it to the tray.

## Pull requests

- Keep changes focused and describe the user-visible behavior.
- Run `node --check client.js` and make sure `package.json` and the locale JSON files still parse.
- Test on a DSH desktop window: open, drag, resize, maximize/restore, close/reopen, and sign-in restore.
- Do not commit personal data: screenshots must not show session titles, account names, avatars, phone numbers, QR codes, or tokens.
- Commit messages: short imperative subject, optional body explaining the why.

## Reporting bugs

Use the bug report issue template. Include the DSH version, OS, steps to reproduce, expected and actual behavior, and whether the bug happens in the desktop window only.
