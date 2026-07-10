import { useCallback, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300
): T {
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );
}
