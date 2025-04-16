"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocalStorage as useLocalStorageFromUseHooksTs } from "usehooks-ts";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [storedValue, setStoredValue] = useLocalStorageFromUseHooksTs(
    key,
    initialValue,
  );
  const [renderedOnClient, setRenderedOnClient] = useState(false);

  useEffect(() => {
    setRenderedOnClient(true);
  }, []);

  return [renderedOnClient ? storedValue : initialValue, setStoredValue, renderedOnClient];
};

export default function useApiKey(): [
  string,
  Dispatch<SetStateAction<string>>,
  boolean,
] {
  const [apiKey, setApiKey, renderedOnClient] = useLocalStorage<string>("apiKey", "");

  return [apiKey, setApiKey, renderedOnClient];
}
