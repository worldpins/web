import * as React from 'react';

export default function useLockBodyScroll(): void {
  React.useLayoutEffect(
    () => {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    },
    []);
}
