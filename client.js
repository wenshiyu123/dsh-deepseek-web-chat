window.__ModuleLoader__.load({
  id: 'dsh-deepseek-web-chat',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'deepseekWebChat';
    const TARGET_URL = 'https://chat.deepseek.com/';
    const STUB_URL = 'https://chat.deepseek.com/robots.txt';
    const SESSION_KEY = 'dswc.session.v1';
    const LEASE_KEY = 'deepseek-web-chat';

    const zh = {
      entry: 'DeepSeek 对话',
      title: 'DeepSeek 对话',
      subtitle: '官网网页版',
      refresh: '刷新',
      openExternal: '在浏览器打开',
      maximize: '最大化',
      restore: '还原',
      close: '关闭',
      resize: '拖动调整大小',
      loading: '正在连接 DeepSeek…',
      remembered: '登录已记住',
      errorTitle: '网页加载失败',
      errorText: '暂时无法加载 DeepSeek 网页版，请重试或在浏览器中打开。',
      retry: '重试',
      unsupportedTitle: '需要在桌面应用中打开',
      unsupportedText: '对话模式使用 DSH 桌面应用的嵌入式浏览器。请在桌面应用窗口中使用，或改用浏览器访问官网。',
    };

    const en = {
      entry: 'DeepSeek chat',
      title: 'DeepSeek chat',
      subtitle: 'Official web app',
      refresh: 'Reload',
      openExternal: 'Open in browser',
      maximize: 'Maximize',
      restore: 'Restore',
      close: 'Close',
      resize: 'Drag to resize',
      loading: 'Connecting to DeepSeek…',
      remembered: 'Sign-in remembered',
      errorTitle: 'Could not load the page',
      errorText: 'DeepSeek web chat is unavailable right now. Retry or open it in your browser.',
      retry: 'Retry',
      unsupportedTitle: 'Open this in the desktop app',
      unsupportedText: 'Chat mode uses the DSH desktop app browser. Use the desktop window, or open the site in your browser.',
    };

    const CSS = `
      .dswc-layer { position: fixed; inset: 0; pointer-events: none; z-index: 60; }
      .dswc-panel {
        position: fixed; display: flex; flex-direction: column; pointer-events: auto;
        background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
        border: 1px solid var(--dsw-alias-border-l1); border-radius: 14px; overflow: hidden;
        box-shadow: 0 24px 70px rgba(0, 0, 0, .28), 0 4px 16px rgba(0, 0, 0, .14);
        transition: transform 220ms cubic-bezier(.22, 1, .36, 1), opacity 220ms cubic-bezier(.22, 1, .36, 1);
      }
      .dswc-panel[data-motion="enter"] {
        transform: translateX(56px); opacity: 0; pointer-events: none;
        will-change: transform, opacity;
      }
      .dswc-panel[data-motion="idle"] { transform: translateX(0); opacity: 1; }
      .dswc-panel[data-motion="exit"] {
        transform: translateX(56px); opacity: 0; pointer-events: none;
        transition-duration: 160ms; transition-timing-function: cubic-bezier(.4, 0, 1, 1);
        will-change: transform, opacity;
      }
      @media (prefers-reduced-motion: reduce) {
        .dswc-panel { transition: none !important; }
      }
      .dswc-head {
        flex: none; height: 44px; display: flex; align-items: center; gap: 7px;
        padding: 0 8px 0 13px; background: var(--dsw-alias-bg-layer-2);
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        cursor: move; user-select: none; -webkit-user-select: none;
      }
      .dswc-mark { display: inline-flex; color: var(--dsw-alias-brand-primary); flex: none; }
      .dswc-title { font-size: 13px; font-weight: 600; white-space: nowrap; }
      .dswc-sub { font-size: 11px; color: var(--dsw-alias-label-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dswc-remembered { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: var(--dsw-alias-state-success-primary); white-space: nowrap; flex: none; }
      .dswc-remembered::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
      .dswc-actions { margin-left: auto; display: flex; align-items: center; gap: 2px; flex: none; }
      .dswc-btn {
        width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center;
        border: 0; border-radius: 8px; background: transparent; color: var(--dsw-alias-label-secondary);
        cursor: pointer; padding: 0;
      }
      .dswc-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); color: var(--dsw-alias-label-primary); }
      .dswc-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .dswc-btn.dswc-close:hover { background: var(--dsw-alias-state-error-primary); color: #fff; }
      .dswc-btn.dswc-btn-restore {
        width: auto; gap: 5px; padding: 0 10px; font: inherit; font-size: 12px;
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
      }
      .dswc-btn.dswc-btn-restore:hover {
        color: var(--dsw-alias-brand-primary);
        background: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
      }
      .dswc-btn-text { white-space: nowrap; }
      .dswc-body { position: relative; flex: 1 1 auto; min-height: 0; background: var(--dsw-alias-bg-base); }
      .dswc-host { position: absolute; inset: 0; }
      .dswc-host webview { display: flex; width: 100%; height: 100%; border: 0; }
      .dswc-status {
        position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 10px;
        background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary);
        font-size: 13px; pointer-events: none;
      }
      .dswc-spinner {
        width: 16px; height: 16px; border-radius: 50%; flex: none;
        border: 2px solid var(--dsw-alias-border-l2); border-top-color: var(--dsw-alias-brand-primary);
        animation: dswc-spin .8s linear infinite;
      }
      @keyframes dswc-spin { to { transform: rotate(360deg); } }
      .dswc-error {
        position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 12px; padding: 28px; text-align: center; background: var(--dsw-alias-bg-layer-1);
      }
      .dswc-error-title { font-size: 14px; font-weight: 600; }
      .dswc-error-text { font-size: 12px; line-height: 1.65; color: var(--dsw-alias-label-secondary); max-width: 380px; word-break: break-word; }
      .dswc-error-actions { display: flex; gap: 8px; margin-top: 2px; }
      .dswc-primary {
        height: 30px; padding: 0 14px; border: 0; border-radius: 8px; cursor: pointer;
        background: var(--dsw-alias-brand-primary); color: #fff; font: inherit; font-size: 12px;
      }
      .dswc-ghost {
        height: 30px; padding: 0 14px; border-radius: 8px; cursor: pointer;
        border: 1px solid var(--dsw-alias-border-l2); background: transparent;
        color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px;
      }
      .dswc-resize { position: absolute; right: 0; bottom: 0; width: 16px; height: 16px; cursor: nwse-resize; z-index: 6; }
      .dswc-resize::after {
        content: ""; position: absolute; right: 4px; bottom: 4px; width: 6px; height: 6px;
        border-right: 2px solid var(--dsw-alias-label-secondary); border-bottom: 2px solid var(--dsw-alias-label-secondary);
        opacity: .55; border-bottom-right-radius: 1px;
      }
      .dswc-entry {
        display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px;
        box-sizing: border-box; border: 0; border-radius: 8px; background: transparent;
        color: var(--dsw-alias-label-secondary); font: inherit; font-size: 13px; cursor: pointer;
        text-align: left; min-width: 0;
      }
      .dswc-entry:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); color: var(--dsw-alias-label-primary); }
      .dswc-entry:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .dswc-entry[data-open="true"] { color: var(--dsw-alias-brand-primary); }
      .dswc-entry[data-wide="false"] { width: 32px; justify-content: center; padding: 0; }
      .dswc-entry-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dswc-entry svg { flex: none; }
    `;

    // ---------------------------------------------------------------- store

    let snapshot = { open: false, phase: 'idle', error: '', siteTitle: '', remembered: false };
    let resetGeometry = null;
    const listeners = new Set();

    function setStore(patch) {
      snapshot = Object.assign({}, snapshot, patch);
      for (const fn of listeners) fn();
    }

    function subscribeStore(fn) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    }

    function getStore() {
      return snapshot;
    }

    function useStore() {
      return React.useSyncExternalStore(subscribeStore, getStore);
    }

    function openChat() {
      invalidateFrameTop();
      if (resetGeometry !== null) resetGeometry();
      setStore({ open: true });
    }

    function closeChat() {
      // Keep the current geometry during the exit motion; the next open resets it.
      setStore({ open: false });
    }

    function toggleOpen() {
      if (snapshot.open) closeChat();
      else openChat();
    }

    function useLocaleRefresh(locale) {
      const [, force] = React.useState(0);
      React.useEffect(
        () => locale.subscribe(() => force((n) => n + 1)),
        [locale],
      );
    }

    // ------------------------------------------------------------- geometry

    let frameTopCache = -1;

    /**
     * Read a length-valued custom property. Custom properties keep their
     * token stream (for example `calc(40px + 20px)`), so the numbers are
     * summed instead of parsed as one float.
     */
    function readCssPx(prop) {
      try {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(prop);
        if (!raw) return 0;
        const numbers = raw.match(/\d+(?:\.\d+)?/g);
        if (!numbers) return 0;
        let total = 0;
        for (const number of numbers) total += Number(number);
        return total;
      } catch (error) {
        return 0;
      }
    }

    /**
     * Height of the window caption band the frame reserves above its content.
     * Falls back to the Windows caption height so a missing or unreadable
     * variable can never put our own title bar back under the window controls.
     */
    function frameTop() {
      if (frameTopCache >= 0) return frameTopCache;
      const caption = Math.max(readCssPx('--dsh-frame-top-clearance'), 40);
      frameTopCache = caption;
      return frameTopCache;
    }

    function invalidateFrameTop() {
      frameTopCache = -1;
    }

    function clampGeo(input) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(Math.max(360, Number(input && input.w) || 480), Math.max(360, vw - 24));
      const ht = Math.min(Math.max(420, Number(input && input.h) || 640), Math.max(420, vh - 24));
      const minY = frameTop() + 8;
      const minX = 8;
      const x = Math.min(Math.max(minX, Number(input && input.x) || 0), Math.max(minX, vw - w - 8));
      const y = Math.min(Math.max(minY, Number(input && input.y) || 0), Math.max(minY, vh - ht - 8));
      return { x, y, w, h: ht };
    }

    function defaultGeo() {
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = document.documentElement.clientHeight || window.innerHeight;
      const w = Math.min(500, Math.max(360, vw - 140));
      const ht = Math.min(720, Math.max(440, vh - 150));
      return clampGeo({ x: vw - w - 16, y: Math.max(70, (vh - ht) / 2 - 16), w, h: ht });
    }

    function loadGeo() {
      return defaultGeo();
    }

    function sidebarWidth() {
      try {
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--dsh-windows-sidebar-width');
        const px = parseFloat(raw);
        if (Number.isFinite(px) && px > 0) return px;
      } catch (error) {
        // a browser document has no sidebar width to reserve
      }
      return 0;
    }

    function maxGeo() {
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = document.documentElement.clientHeight || window.innerHeight;
      const top = frameTop() + 20;
      const left = sidebarWidth() + 8;
      return {
        x: Math.min(left, Math.max(8, vw - 360 - 8)),
        y: top,
        w: Math.max(360, vw - left - 8),
        h: Math.max(420, vh - top - 8),
      };
    }

    // -------------------------------------------------------------- session

    const session = { webview: null, lease: null, booted: false, heartbeat: 0, offOpen: null };

    function waitReady(el, timeout) {
      return new Promise((resolve, reject) => {
        let settled = false;
        const finish = (fn, value) => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          el.removeEventListener('dom-ready', onReady);
          el.removeEventListener('did-fail-load', onFail);
          fn(value);
        };
        const onReady = () => finish(resolve);
        const onFail = (event) => {
          if (event && event.isMainFrame === false) return;
          if (event && event.errorCode === -3) return;
          finish(reject, new Error((event && event.errorDescription) || 'load failed'));
        };
        const timer = setTimeout(() => finish(reject, new Error('timeout')), timeout || 30000);
        el.addEventListener('dom-ready', onReady);
        el.addEventListener('did-fail-load', onFail);
      });
    }

    async function go(el, url, timeout) {
      const ready = waitReady(el, timeout);
      try {
        const pending = typeof el.loadURL === 'function' ? el.loadURL(url) : null;
        if (pending && typeof pending.catch === 'function') pending.catch(() => {});
        if (!pending) el.setAttribute('src', url);
      } catch (error) {
        el.setAttribute('src', url);
      }
      await ready;
    }

    function readSnapshot() {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || typeof data !== 'object' || !data.items || typeof data.items !== 'object') return null;
        if (typeof data.items.userToken !== 'string' || data.items.userToken.length < 20) return null;
        return data;
      } catch (error) {
        return null;
      }
    }

    function injectScript(items) {
      const safe = {};
      for (const key of Object.keys(items || {})) {
        if (typeof items[key] === 'string') safe[key] = items[key];
      }
      return (
        '(() => { try { const d = ' +
        JSON.stringify(safe) +
        '; const keys = Object.keys(d); for (let i = 0; i < keys.length; i += 1) localStorage.setItem(keys[i], d[keys[i]]); return true; } catch (e) { return false; } })()'
      );
    }

    const READ_SCRIPT =
      "(() => { try { const o = {}; let n = 0; for (let i = 0; i < localStorage.length; i += 1) { const k = localStorage.key(i); if (!k) continue; const v = localStorage.getItem(k); if (typeof v !== 'string' || v.length > 262144) continue; o[k] = v; n += v.length; if (n > 1048576) break; } return JSON.stringify({ items: o }); } catch (e) { return ''; } })()";

    async function captureSession(el) {
      if (!el || !el.isConnected || typeof el.executeJavaScript !== 'function') return;
      let url = '';
      try {
        url = el.getURL();
      } catch (error) {
        return;
      }
      if (typeof url !== 'string' || url.indexOf('https://chat.deepseek.com/') !== 0) return;
      if (url.indexOf('/robots.txt') !== -1) return;
      const payload = await el.executeJavaScript(READ_SCRIPT, false);
      if (typeof payload !== 'string' || payload.length === 0) return;
      let data;
      try {
        data = JSON.parse(payload);
      } catch (error) {
        return;
      }
      const items = data && data.items;
      if (!items || typeof items !== 'object') return;
      const token = items.userToken;
      if (typeof token === 'string' && token.length > 20) {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify({ v: 1, at: Date.now(), items }));
          setStore({ remembered: true });
        } catch (error) {
          // ignore quota failures
        }
      } else if (localStorage.getItem(SESSION_KEY)) {
        localStorage.removeItem(SESSION_KEY);
        setStore({ remembered: false });
      }
    }

    function startHeartbeat(el) {
      if (session.heartbeat) clearInterval(session.heartbeat);
      const tick = () => {
        captureSession(el).catch(() => {});
      };
      setTimeout(tick, 2500);
      session.heartbeat = setInterval(tick, 15000);
    }

    async function startSession(host) {
      if (!host) return;
      const bridge = window.dshDesktop;
      if (!bridge || !bridge.browser || typeof bridge.browser.acquire !== 'function') {
        setStore({ phase: 'unsupported', error: '' });
        return;
      }
      setStore({ phase: 'loading', error: '' });
      try {
        const info = await bridge.browser.acquire(LEASE_KEY);
        if (!info || typeof info.lease !== 'string' || typeof info.partition !== 'string') {
          throw new Error('browser lease unavailable');
        }
        session.lease = info.lease;
        const el = document.createElement('webview');
        el.className = 'dswc-guest';
        el.setAttribute('partition', info.partition);
        el.setAttribute('src', 'about:blank#' + info.lease);
        el.addEventListener('page-title-updated', (event) => {
          setStore({ siteTitle: (event && event.title) || '' });
        });
        el.addEventListener('did-fail-load', (event) => {
          if (event && event.isMainFrame === false) return;
          if (event && event.errorCode === -3) return;
          setStore({ phase: 'error', error: (event && event.errorDescription) || '' });
        });
        el.addEventListener('render-process-gone', () => {
          setStore({ phase: 'error', error: 'renderer gone' });
        });
        const first = waitReady(el, 15000);
        host.replaceChildren(el);
        session.webview = el;
        await first;

        const saved = readSnapshot();
        if (saved) {
          setStore({ remembered: true });
          try {
            await go(el, STUB_URL, 20000);
            await el.executeJavaScript(injectScript(saved.items), false);
          } catch (error) {
            // the fallback below injects on the application origin instead
          }
        }
        await go(el, TARGET_URL, 30000);
        if (saved) {
          try {
            const token = await el.executeJavaScript("localStorage.getItem('userToken')", false);
            if (!token) {
              await el.executeJavaScript(injectScript(saved.items), false);
              await go(el, TARGET_URL, 30000);
            }
          } catch (error) {
            // the sign-in page still works when a restore attempt fails
          }
        }
        setStore({ phase: 'ready', error: '' });
        startHeartbeat(el);
        if (typeof bridge.browser.onOpenRequested === 'function') {
          try {
            session.offOpen = bridge.browser.onOpenRequested(info.lease, (url) => {
              try {
                window.open(url, '_blank', 'noopener');
              } catch (error) {
                // ignore a rejected external open
              }
            });
          } catch (error) {
            // older desktop bridges do not expose popup notifications
          }
        }
      } catch (error) {
        setStore({ phase: 'error', error: String((error && error.message) || error || '') });
      }
    }

    async function resetSession() {
      if (session.heartbeat) {
        clearInterval(session.heartbeat);
        session.heartbeat = 0;
      }
      if (session.offOpen) {
        try {
          session.offOpen();
        } catch (error) {
          // ignore a stale subscription
        }
        session.offOpen = null;
      }
      const el = session.webview;
      session.webview = null;
      if (el) {
        try {
          el.remove();
        } catch (error) {
          // ignore a detached guest
        }
      }
      const lease = session.lease;
      session.lease = null;
      const bridge = window.dshDesktop;
      if (lease && bridge && bridge.browser && typeof bridge.browser.release === 'function') {
        try {
          await bridge.browser.release(lease);
        } catch (error) {
          // a released or expired lease is already gone
        }
      }
      session.booted = false;
      setStore({ phase: 'idle', error: '' });
    }

    function openExternal() {
      try {
        window.open(TARGET_URL, '_blank', 'noopener');
      } catch (error) {
        // ignore a blocked popup
      }
    }

    function reloadGuest() {
      const el = session.webview;
      if (!el) return;
      try {
        el.reload();
      } catch (error) {
        // ignore a detached guest
      }
    }

    // ---------------------------------------------------------------- icons

    function BubbleIcon(props) {
      const size = (props && props.size) || 16;
      return h(
        'svg',
        {
          viewBox: '0 0 20 20',
          width: size,
          height: size,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
        },
        h('path', { d: 'M3 6.4A2.9 2.9 0 0 1 5.9 3.5h8.2A2.9 2.9 0 0 1 17 6.4v5.4a2.9 2.9 0 0 1-2.9 2.9H8.4l-3.9 2.9a.5.5 0 0 1-.8-.4v-3.1A2.9 2.9 0 0 1 3 11.8V6.4Z' }),
        h('path', { d: 'M6.8 7.4h6.4M6.8 10.2h3.6' }),
      );
    }

    function RefreshIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M13 8a5 5 0 1 1-1.6-3.7' }),
        h('path', { d: 'M13 3.2v3.1H9.9' }),
      );
    }

    function ExternalIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M9.5 3h3.5v3.5' }),
        h('path', { d: 'M13 3 7.8 8.2' }),
        h('path', { d: 'M12 9.6v2.6a1.4 1.4 0 0 1-1.4 1.4H3.8A1.4 1.4 0 0 1 2.4 12.2V5.4A1.4 1.4 0 0 1 3.8 4h2.6' }),
      );
    }

    function MaxIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M6 2.8H2.8V6M10 2.8h3.2V6M6 13.2H2.8V10M10 13.2h3.2V10' }),
      );
    }

    function RestoreIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('rect', { x: 2.6, y: 5.6, width: 7.8, height: 7.8, rx: 1.8 }),
        h('path', { d: 'M5.6 5.6V4.1c0-.9.7-1.6 1.6-1.6h5.3c.9 0 1.6.7 1.6 1.6v5.3c0 .9-.7 1.6-1.6 1.6h-1.5' }),
      );
    }

    function CloseIcon() {
      return h(
        'svg',
        { viewBox: '0 0 16 16', width: 15, height: 15, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M4 4l8 8M12 4l-8 8' }),
      );
    }

    // ------------------------------------------------------------ components

    function makeEntry(t, locale) {
      return function Entry(props) {
        useLocaleRefresh(locale);
        const state = useStore();
        const wide = Boolean(props && props.wide);
        const label = t('entry');
        return h(
          'button',
          {
            type: 'button',
            className: 'dswc-entry',
            'data-wide': wide ? 'true' : 'false',
            'data-open': state.open ? 'true' : 'false',
            title: label,
            'aria-label': label,
            'aria-pressed': state.open ? 'true' : 'false',
            onClick: toggleOpen,
          },
          h(BubbleIcon, { size: 16 }),
          wide ? h('span', { className: 'dswc-entry-label' }, label) : null,
        );
      };
    }

    function makePanel(t, locale) {
      return function Panel() {
        useLocaleRefresh(locale);
        const state = useStore();
        const hostRef = React.useRef(null);
        const [geo, setGeo] = React.useState(loadGeo);
        const geoRef = React.useRef(geo);
        const [maxed, setMaxed] = React.useState(false);
        const preMax = React.useRef(null);
        const [visible, setVisible] = React.useState(false);
        const [motion, setMotion] = React.useState('idle');
        const visibleRef = React.useRef(false);
        const exitTimer = React.useRef(0);
        const enterFrame = React.useRef(0);
        const viewportRef = React.useRef({ w: window.innerWidth, h: window.innerHeight });

        React.useEffect(() => {
          const reduce = typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (state.open) {
            if (exitTimer.current) {
              clearTimeout(exitTimer.current);
              exitTimer.current = 0;
            }
            visibleRef.current = true;
            setVisible(true);
            if (reduce) {
              setMotion('idle');
              return undefined;
            }
            setMotion('enter');
            enterFrame.current = requestAnimationFrame(() => {
              enterFrame.current = requestAnimationFrame(() => {
                enterFrame.current = 0;
                setMotion('idle');
              });
            });
            return () => {
              if (enterFrame.current) {
                cancelAnimationFrame(enterFrame.current);
                enterFrame.current = 0;
              }
            };
          }
          if (!visibleRef.current) return undefined;
          if (reduce) {
            visibleRef.current = false;
            setVisible(false);
            setMotion('idle');
            return undefined;
          }
          setMotion('exit');
          exitTimer.current = setTimeout(() => {
            exitTimer.current = 0;
            visibleRef.current = false;
            setVisible(false);
            setMotion('idle');
          }, 170);
          return () => {
            if (exitTimer.current) {
              clearTimeout(exitTimer.current);
              exitTimer.current = 0;
            }
          };
        }, [state.open]);

        React.useEffect(() => {
          geoRef.current = geo;
        }, [geo]);

        React.useEffect(() => {
          const reset = () => {
            preMax.current = null;
            setMaxed(false);
            setGeo(defaultGeo());
          };
          resetGeometry = reset;
          return () => {
            if (resetGeometry === reset) resetGeometry = null;
          };
        }, []);

        React.useEffect(() => {
          if (!state.open || session.booted) return;
          session.booted = true;
          startSession(hostRef.current);
        }, [state.open]);

        React.useEffect(() => {
          const onResize = () => {
            invalidateFrameTop();
            const previous = viewportRef.current;
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            viewportRef.current = { w: vw, h: vh };
            const dx = vw - previous.w;
            setGeo((current) => {
              if (maxed) return maxGeo();
              const rightMargin = previous.w - (current.x + current.w);
              const nextX = rightMargin <= 48 ? current.x + dx : current.x;
              return clampGeo({ x: nextX, y: current.y, w: current.w, h: current.h });
            });
          };
          window.addEventListener('resize', onResize);
          return () => window.removeEventListener('resize', onResize);
        }, [maxed]);

        const gestureRef = React.useRef(null);

        const endGesture = () => {
          const gesture = gestureRef.current;
          if (!gesture) return;
          gestureRef.current = null;
          window.removeEventListener('pointermove', gesture.move);
          window.removeEventListener('pointerup', gesture.up);
          window.removeEventListener('pointercancel', gesture.cancel);
          window.removeEventListener('blur', gesture.end);
          document.removeEventListener('visibilitychange', gesture.visibility);
          gesture.element.removeEventListener('lostpointercapture', gesture.lost);
          try {
            if (gesture.element.hasPointerCapture && gesture.element.hasPointerCapture(gesture.pointerId)) {
              gesture.element.releasePointerCapture(gesture.pointerId);
            }
          } catch (error) {
            // capture may already be gone
          }
        };

        const beginGesture = (element, pointerId, onMove) => {
          endGesture();
          const gesture = { element, pointerId };
          gesture.move = (event) => {
            if (event.pointerId !== pointerId) return;
            if (event.buttons === 0) {
              endGesture();
              return;
            }
            onMove(event);
          };
          gesture.up = (event) => {
            if (event.pointerId === pointerId) endGesture();
          };
          gesture.cancel = (event) => {
            if (event.pointerId === pointerId) endGesture();
          };
          gesture.end = () => endGesture();
          gesture.visibility = () => {
            if (document.visibilityState === 'hidden') endGesture();
          };
          gesture.lost = () => endGesture();
          gestureRef.current = gesture;
          try {
            element.setPointerCapture(pointerId);
          } catch (error) {
            // capture is a resilience layer; window listeners still work
          }
          window.addEventListener('pointermove', gesture.move);
          window.addEventListener('pointerup', gesture.up);
          window.addEventListener('pointercancel', gesture.cancel);
          window.addEventListener('blur', gesture.end);
          document.addEventListener('visibilitychange', gesture.visibility);
          element.addEventListener('lostpointercapture', gesture.lost);
        };

        React.useEffect(() => () => endGesture(), []);

        const beginDrag = (event) => {
          if (event.button !== 0 || maxed) return;
          const target = event.target;
          if (target && typeof target.closest === 'function' && target.closest('button')) return;
          event.preventDefault();
          const startX = event.clientX;
          const startY = event.clientY;
          const start = geoRef.current;
          beginGesture(event.currentTarget, event.pointerId, (ev) => {
            setGeo(clampGeo({ x: start.x + ev.clientX - startX, y: start.y + ev.clientY - startY, w: start.w, h: start.h }));
          });
        };

        const beginResize = (event) => {
          if (event.button !== 0 || maxed) return;
          event.preventDefault();
          event.stopPropagation();
          const startX = event.clientX;
          const startY = event.clientY;
          const start = geoRef.current;
          beginGesture(event.currentTarget, event.pointerId, (ev) => {
            setGeo(clampGeo({ x: start.x, y: start.y, w: start.w + ev.clientX - startX, h: start.h + ev.clientY - startY }));
          });
        };

        const toggleMax = () => {
          if (!maxed) {
            preMax.current = geoRef.current;
            setGeo(maxGeo());
            setMaxed(true);
          } else {
            setGeo(preMax.current ? clampGeo(preMax.current) : defaultGeo());
            setMaxed(false);
          }
        };

        const retry = () => {
          resetSession()
            .then(() => {
              session.booted = true;
              return startSession(hostRef.current);
            })
            .catch(() => {});
        };

        const closePanel = () => {
          if (session.webview) captureSession(session.webview).catch(() => {});
          closeChat();
        };

        const phase = state.phase;
        const panelStyle = { left: geo.x + 'px', top: geo.y + 'px', width: geo.w + 'px', height: geo.h + 'px' };

        let overlay = null;
        if (phase === 'loading') {
          overlay = h('div', { className: 'dswc-status' }, h('span', { className: 'dswc-spinner' }), t('loading'));
        } else if (phase === 'error' || phase === 'unsupported') {
          const unsupported = phase === 'unsupported';
          overlay = h(
            'div',
            { className: 'dswc-error' },
            h('div', { className: 'dswc-error-title' }, unsupported ? t('unsupportedTitle') : t('errorTitle')),
            h('div', { className: 'dswc-error-text' }, unsupported ? t('unsupportedText') : state.error || t('errorText')),
            h(
              'div',
              { className: 'dswc-error-actions' },
              unsupported ? null : h('button', { type: 'button', className: 'dswc-primary', onClick: retry }, t('retry')),
              h('button', { type: 'button', className: 'dswc-ghost', onClick: openExternal }, t('openExternal')),
            ),
          );
        }

        return h(
          'div',
          { className: 'dswc-layer', style: { display: visible ? 'block' : 'none' } },
          h(
            'div',
            { className: 'dswc-panel', style: panelStyle, 'data-motion': motion, role: 'dialog', 'aria-label': t('title') },
            h(
              'div',
              { className: 'dswc-head', onPointerDown: beginDrag, onDoubleClick: toggleMax },
              h('span', { className: 'dswc-mark' }, h(BubbleIcon, { size: 15 })),
              h('span', { className: 'dswc-title' }, t('title')),
              h('span', { className: 'dswc-sub' }, t('subtitle')),
              state.remembered && phase === 'ready' ? h('span', { className: 'dswc-remembered' }, t('remembered')) : null,
              h(
                'div',
                { className: 'dswc-actions' },
                h('button', { type: 'button', className: 'dswc-btn', title: t('refresh'), 'aria-label': t('refresh'), onClick: reloadGuest }, h(RefreshIcon)),
                h('button', { type: 'button', className: 'dswc-btn', title: t('openExternal'), 'aria-label': t('openExternal'), onClick: openExternal }, h(ExternalIcon)),
                maxed
                  ? h(
                      'button',
                      { type: 'button', className: 'dswc-btn dswc-btn-restore', title: t('restore'), 'aria-label': t('restore'), onClick: toggleMax },
                      h(RestoreIcon),
                      h('span', { className: 'dswc-btn-text' }, t('restore')),
                    )
                  : h('button', { type: 'button', className: 'dswc-btn', title: t('maximize'), 'aria-label': t('maximize'), onClick: toggleMax }, h(MaxIcon)),
                h('button', { type: 'button', className: 'dswc-btn dswc-close', title: t('close'), 'aria-label': t('close'), onClick: closePanel }, h(CloseIcon)),
              ),
            ),
            h('div', { className: 'dswc-body' }, h('div', { className: 'dswc-host', ref: hostRef }), overlay),
            maxed ? null : h('div', { className: 'dswc-resize', title: t('resize'), onPointerDown: beginResize }),
          ),
        );
      };
    }

    // ---------------------------------------------------------------- plugin

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const t = ctx.locale.bind(NS);

        ctx.effect(() => {
          const offZh = ctx.locale.register(NS, 'zh', zh);
          const offEn = ctx.locale.register(NS, 'en', en);
          return () => {
            offZh();
            offEn();
          };
        });

        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-dswc-style', '');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => style.remove();
        });

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            { name: 'shell.overlay', id: 'deepseek-web-chat.panel', order: 90 },
            makePanel(t, ctx.locale),
          ),
        );

        ctx.slots.inject('sidebar.footer.action', () =>
          ctx.slots.register(
            { name: 'sidebar.footer.action', id: 'deepseek-web-chat.entry', order: 10, label: () => t('entry') },
            makeEntry(t, ctx.locale),
          ),
        );

        ctx.effect(() => () => {
          resetSession().catch(() => {});
        });
      },
    };
  },
});
