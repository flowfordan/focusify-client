'use client';
import { useState, useEffect, useRef, RefObject } from 'react';

interface IOutsideClickHandler {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

export const OutsideClickHandler = ({
  children,
  onOutsideClick,
}: IOutsideClickHandler) => {
  // const [isComponentVisible, setIsComponentVisible] =
  //   useState(initialIsVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};
