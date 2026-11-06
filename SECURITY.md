# Security Policy

## Supported versions

Only the latest published version of `dsh-deepseek-web-chat` is supported.

## Reporting a vulnerability

Please **do not open a public issue** for security problems. Use GitHub's private vulnerability reporting:

1. Open the repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Describe the issue, the affected version, and reproduction steps.

You will receive an acknowledgement as soon as possible. Please allow time for a fix before any public disclosure.

## Scope notes

- The plugin stores a snapshot of `chat.deepseek.com` local storage (including the site's `userToken`) in DSH's local application data so that sign-in survives restarts. Anyone who can run code as your OS user can read it. This is the same trust boundary as browser cookies.
- The embedded page runs in a sandboxed webview without Node integration or a preload script; it cannot read the harness DOM or call harness APIs.
- The plugin does not send telemetry and does not proxy network traffic.
