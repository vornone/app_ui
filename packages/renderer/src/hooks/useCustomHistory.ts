import { useState } from "react";

export function useCustomHistory(initialPath: string) {
  const [historyStack, setHistoryStack] = useState<string[]>([initialPath]);
  const [index, setIndex] = useState(0);

  const push = (path: string) => {
    const newStack = [...historyStack.slice(0, index + 1), path];
    setHistoryStack(newStack);
    setIndex(newStack.length - 1);
  };

  const back = () => {
    if (index > 0) setIndex(index - 1);
  };

  const forward = () => {
    if (index < historyStack.length - 1) setIndex(index + 1);
  };

  const canGoBack = index > 0;
  const canGoForward = index < historyStack.length - 1;

  return { historyStack, index, push, back, forward, canGoBack, canGoForward };
}
