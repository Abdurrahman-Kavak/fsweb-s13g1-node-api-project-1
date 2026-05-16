import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item === null) return initialValue;
    try {
      return JSON.parse(item);
    } catch {
      return item; // JSON olmayan düz stringler için (eski token vb.)
    }
  });

  const updateValue = (newValue) => {
    setValue(newValue);
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(
        key,
        typeof newValue === "string" ? newValue : JSON.stringify(newValue),
      );
    }
  };

  return [value, updateValue];
};
