// src/utils/buffer-polyfill.js
// Simple Buffer polyfill for browser environment
export class BufferPolyfill {
  constructor(input, encoding) {
    if (typeof input === 'string') {
      this.data = new TextEncoder().encode(input);
    } else if (input instanceof Uint8Array) {
      this.data = input;
    } else if (Array.isArray(input)) {
      this.data = new Uint8Array(input);
    } else {
      this.data = new Uint8Array(0);
    }
  }

  toString(encoding = 'utf-8') {
    return new TextDecoder(encoding).decode(this.data);
  }

  static from(input, encoding) {
    return new BufferPolyfill(input, encoding);
  }
}

// Add to global scope for libraries that expect Buffer to exist
window.Buffer = BufferPolyfill;