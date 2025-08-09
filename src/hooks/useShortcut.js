import { useEffect, useRef } from "react";

/**
 * @param {Array} shortcuts - Array of shortcut objects
 * @param {string} shortcuts[].key - Key to listen for
 * @param {Function} shortcuts[].handler - Handler function
 * @param {Object} shortcuts[].options - Options object
 * @param {number} shortcuts[].options.debounce - Debounce delay
 * @param {boolean} shortcuts[].options.ctrlKey - Require ctrl key
 * @param {boolean} shortcuts[].options.metaKey - Require meta key
 * @param {boolean} shortcuts[].options.shiftKey - Require shift key
 */
export const useShortcut = (shortcuts) => {
  const debounceTimeouts = useRef(new Map());

  useEffect(() => {
    const keydownEvent = (event) => {
      const shortcut = shortcuts.find((shortcut) => {
        const keyMatches = shortcut.key === event.key;
        const ctrlMatches = shortcut.options?.ctrlKey
          ? event.ctrlKey
          : !event.ctrlKey;
        const metaMatches = shortcut.options?.metaKey
          ? event.metaKey
          : !event.metaKey;
        const shiftMatches = shortcut.options?.shiftKey
          ? event.shiftKey
          : !event.shiftKey;

        return keyMatches && ctrlMatches && metaMatches && shiftMatches;
      });

      if (!shortcut) return;

      event.preventDefault();

      if (!shortcut.options?.debounce) {
        shortcut.handler(event);
        return;
      }

      const existingTimeout = debounceTimeouts.current.get(shortcut.key);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeout = setTimeout(() => {
        shortcut.handler(event);
        debounceTimeouts.current.delete(shortcut.key);
      }, shortcut.options.debounce);

      debounceTimeouts.current.set(shortcut.key, timeout);
    };

    window.addEventListener("keydown", keydownEvent);

    return () => {
      window.removeEventListener("keydown", keydownEvent);

      debounceTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      debounceTimeouts.current.clear();
    };
  }, [shortcuts]);
};
