import { useEffect, useCallback } from "react";

const useAutosizeTextArea = (
  ref: HTMLTextAreaElement | null,
  value: string,
) => {
  const adjustHeight = useCallback(() => {
    if (ref) {
      ref.style.height = "0";
      ref.style.height = `${Math.max(ref.scrollHeight, 24)}px`;
    }
  }, [ref]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  return adjustHeight;
};

export default useAutosizeTextArea;
