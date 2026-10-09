"use client";

import { useSyncExternalStore } from "react";

// Pre-rendered with the build year, then read from the browser clock so it stays current.
const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
