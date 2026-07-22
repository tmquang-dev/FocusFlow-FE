import { TextEncoder, TextDecoder } from 'node:util';

if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder;
}

// Polyfill HTMLFormElement.prototype.requestSubmit cho JSDOM
if (typeof HTMLFormElement.prototype.requestSubmit !== 'function') {
  HTMLFormElement.prototype.requestSubmit = function () {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    this.dispatchEvent(event);
  };
}

// Polyfill import.meta.env cho môi trường Jest
if (typeof import.meta !== 'undefined' && !import.meta.env) {
  import.meta.env = {
    VITE_API_URL: process.env.VITE_API_URL || '',
  };
}
