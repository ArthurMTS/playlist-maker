export function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(string: string) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export const getTextSize = () => {
  if (typeof window === "undefined") return 25;

  const width = window.innerWidth;

  if (width >= 1280) return 30;
  else if (width >= 1024) return 25;
  else if (width >= 450) return 25;
  else if (width >= 440) return 24;
  else if (width >= 430) return 23;
  else if (width >= 420) return 22;
  else if (width >= 410) return 21;
  else if (width >= 400) return 20;
  else if (width >= 380) return 18;
  else if (width >= 360) return 17;
  else if (width >= 350) return 16;
  else if (width >= 340) return 15;
  else if (width >= 330) return 14;
  else if (width >= 320) return 13;
  else return 10;
};
