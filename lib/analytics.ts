declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    fbq: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export function trackGAEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export function trackMetaEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
