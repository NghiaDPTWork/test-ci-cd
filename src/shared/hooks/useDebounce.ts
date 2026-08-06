/*
    Custom Hook: useDebounce

    Khi user ngừng typing thì hệ thống mới
    xử lý

    Input:
        - Hành động => Generic T
        - Tỉme => Thời gian ngưng để hành động


*/

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
