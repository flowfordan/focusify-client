import { useCallback, useEffect, useState } from 'react';

const getIsMobile = () =>
  typeof window !== 'undefined' && window && window.innerWidth <= 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  const onResize = useCallback(() => {
    setIsMobile(getIsMobile());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};
