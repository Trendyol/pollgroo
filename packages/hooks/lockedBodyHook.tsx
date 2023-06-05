import { useEffect, useLayoutEffect, useState } from 'react';

type ReturnType = [boolean, (locked: boolean) => void];

export function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

  const documentElementStyle = document.documentElement.style;
  const bodyStyle = document.body.style;

    // Save initial body style
    const originalOverflow = documentElementStyle.overflow;
    const originalPaddingRight = documentElementStyle.paddingRight;

    // Lock body scroll
    documentElementStyle.overflow = 'hidden';
    bodyStyle.overflow = 'hidden';

    // Get the scrollBar width
    const root = document.getElementById('root');
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      documentElementStyle.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      documentElementStyle.overflow = originalOverflow;
      bodyStyle.overflow = originalOverflow;

      if (scrollBarWidth) {
        documentElementStyle.paddingRight = originalPaddingRight;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}