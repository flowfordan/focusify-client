import { useCallback, useEffect, useState } from 'react';

const getIsMobile = () => window && window.innerWidth <= 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  const onResize = useCallback(() => {
    setIsMobile(getIsMobile());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
};
