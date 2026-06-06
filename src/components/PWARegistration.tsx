"use client";

import { useEffect } from "react";

export default function PWARegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let isCancelled = false;

    const registerServiceWorker = () => {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          if (!isCancelled) {
            registration.update().catch(() => undefined);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.warn("Service worker registration failed:", error);
          }
        });
    };

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker, { once: true });
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("load", registerServiceWorker);
    };
  }, []);

  return null;
}
