import { useEffect, useRef } from "react";
import "./styles.css";

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error("Turnstile API did not initialize"));
    script.onerror = () => reject(new Error("Failed to load Turnstile API"));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

interface TurnstileProps {
  onTokenChange: (token: string) => void;
  resetSignal: number;
}

const Turnstile = ({ onTokenChange, resetSignal }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const sitekey = import.meta.env.VITE_TURNSTILE_SITEKEY;

  useEffect(() => {
    let active = true;

    if (!sitekey || !containerRef.current) return;

    void loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current) return;

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey,
          action: "contact",
          theme: "dark",
          callback: onTokenChange,
          "expired-callback": () => onTokenChange(""),
          "error-callback": () => onTokenChange(""),
        });
      })
      .catch(() => onTokenChange(""));

    return () => {
      active = false;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, sitekey]);

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChange("");
    }
  }, [onTokenChange, resetSignal]);

  if (!sitekey) {
    return <p role="alert">Turnstileの設定が不足しています。</p>;
  }

  return <div className="turnstile-container" ref={containerRef} />;
};

export default Turnstile;
