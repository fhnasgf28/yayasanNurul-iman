"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const frame = requestAnimationFrame(onStoreChange);
  return () => cancelAnimationFrame(frame);
}

export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
