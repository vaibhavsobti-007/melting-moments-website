"use client";

import { useCallback, useState } from "react";

export function useLightbox(length: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % length)), [length]);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + length) % length)),
    [length],
  );

  return { index, open, close, next, prev };
}
