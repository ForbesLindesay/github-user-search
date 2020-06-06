import { useRef, useEffect } from "react";

export default function useStaleWhileNull<T>(value: T) {
  const staleValueRef = useRef(value);

  useEffect(() => {
    if (value !== null) {
      staleValueRef.current = value;
    }
  }, [value]);

  return value === null ? staleValueRef.current : value;
}
