import { useState, useEffect } from "react";

export default function useDebouncedValue<T>(value: T, timeoutMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), timeoutMs);
    return () => clearTimeout(t);
  }, [value, timeoutMs]);

  return [debounced, setDebounced] as const;
}
