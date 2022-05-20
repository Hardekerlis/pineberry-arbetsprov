import React, { useEffect, useRef, useState } from 'react';

import styles from './column.module.sass';

const Column = ({ children }) => {
  const columnRef = useRef(null);

  const calcWidth = () => {
    const parent = columnRef.current.parentElement;
    const parentWidth = parent.offsetWidth;
    const childrenAmount = parent.children.length;

    columnRef.current.style.width = `${parentWidth / childrenAmount}px`;
  };

  useEffect(() => {
    window.addEventListener('resize', calcWidth);

    return () => {
      window.removeEventListener('resize', calcWidth);
    };
  }, [columnRef]);

  useEffect(() => {
    calcWidth();
  });

  return (
    <div ref={columnRef} className={styles.column}>
      {children}
    </div>
  );
};

export { Column };
