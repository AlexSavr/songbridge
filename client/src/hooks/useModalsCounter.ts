"use client";

import { useEffect, useState } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : null;

const useModalsCount = () => {
  const [count, setCount] = useState<number>(() => {
    if(!safeDocument) {
      return 0;
    }
    return parseInt(document.body.dataset.modalsOpened || '0') || 0;
  });

  useEffect(() => {
    if(!safeDocument) {
      return;
    }

    document.body.dataset.modalsOpened = count.toString();
  }, [count]);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => Math.max(0, prev - 1));
  };

  const reset = () => {
    setCount(0);
  };

  return {
    count,
    increment,
    decrement,
    reset,
  };
};

export default useModalsCount;