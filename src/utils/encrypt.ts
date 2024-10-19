export class Encryptor {
  #key: CryptoKey | null = null;
  #password: string | null = null;

  constructor(password: string) {
    this.#password = password;
  }

  set password(value: string) {
    if (!value.length) {
      throw new Error("Password cannot be empty");
    }
    this.#password = value;
    this.#key = null;
  }

  private async deriveKey(): Promise<CryptoKey> {
    if (!this.#password) {
      throw new Error('Password is not set');
    }

    if (this.#key) return this.#key;

    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(this.#password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );

    this.#key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("salt"),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    return this.#key;
  }

  async encrypt(data: string): Promise<string> {
    const key = await this.deriveKey();
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encoder.encode(data)
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    const buf = new Uint8Array(iv.byteLength + encryptedContentArr.byteLength);
    buf.set(iv, 0);
    buf.set(encryptedContentArr, iv.byteLength);

    return btoa(String.fromCharCode.apply(null, [...buf]));
  }

  async decrypt(encryptedData: string): Promise<string> {
    const key = await this.deriveKey();
    const decoder = new TextDecoder();
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);

    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      ciphertext
    );

    return decoder.decode(decryptedContent);
  }
}
