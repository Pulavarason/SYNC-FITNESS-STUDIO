"use client";

import { useSyncExternalStore } from "react";

/** Tiny store: flips to true once the intro loader has finished, so hero animations can start. */
let ready = false;
const listeners = new Set<() => void>();

export function setReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false
  );
}
