import * as React from 'react';

interface ContentWithoutScrollbarProps {
  children: any;
}

const ContentWithoutScrollbar: React.SFC<ContentWithoutScrollbarProps> = ({ children }) => {
  const { 0: originalOverflow, 1: setOriginalOverflow } = React.useState('auto');
  React.useLayoutEffect(
    () => {
      if (document.body && document.body.style) {
        setOriginalOverflow(() => document.body.style.overflow || 'auto');
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    },
    [],
  );
  return children;
};

export default ContentWithoutScrollbar;
