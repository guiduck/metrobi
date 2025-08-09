import { createContext, useState, useCallback, useEffect, useRef } from "react";

export const DialogueContext = createContext();

export function DialogueContextProvider({ children }) {
  const [dialogue, setDialogue] = useState({
    isVisible: false,
    currentText: "",
  });
  const timeoutRef = useRef(null);

  const showDialogue = useCallback((text, autoCloseDelay = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setDialogue({
      isVisible: true,
      currentText: text,
    });

    if (autoCloseDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setDialogue((prev) => ({ ...prev, isVisible: false }));
        timeoutRef.current = null;
      }, autoCloseDelay);
    }
  }, []);

  const hideDialogue = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDialogue((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const forceClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDialogue({ isVisible: false, currentText: "" });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = {
    isVisible: dialogue.isVisible,
    currentText: dialogue.currentText,
    showDialogue,
    hideDialogue,
    forceClose,
  };

  return (
    <DialogueContext.Provider value={value}>
      {children}
    </DialogueContext.Provider>
  );
}
