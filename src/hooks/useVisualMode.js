import { useState } from "react";

export default function useVisualMode(initial) {

  const transition = function(newMode,replace = false ) {
    if(replace) {
      setHistory([...history.slice(0,history.length -1), newMode])
      return;
    }
    setHistory([...history, newMode]);
  }    
  
  const back = function () {
    if (history.length > 1) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1)];
      });
    }
  }
  
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];

  return { mode, transition, back };

}