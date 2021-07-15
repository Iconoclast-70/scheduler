import { useState } from "react";

export default function useVisualMode(initial) {
  // Set the state for each transition
  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
      return;
    }
    setHistory([...history, newMode]);
  };

  // Set the state for back navigation
  const back = function () {
    if (history.length > 1) {
      setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1)];
      });
    }
  };

  // Initialize history state and declare mode
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];

  return { mode, transition, back };
}
