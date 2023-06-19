import { useEffect, useState } from 'react';

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    }

    setIsMobile(hasTouchScreen);
  }, []);

  return { isMobile };
}