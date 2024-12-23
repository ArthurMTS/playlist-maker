export const generateRandomString = (length: number) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

export const sha256 = async (plain: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest("SHA-256", data)
}

export const base64encode = (string: ArrayLike<number> | ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(string)))
  .replace(/=/g, "")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");
}
