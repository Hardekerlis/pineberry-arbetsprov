import React, { createContext, useRef, useEffect, useState } from 'react';

export const PromptContext = createContext();

import styles from './promptContext.module.sass';

export const PromptContextProvider = ({ children }) => {
  const [prompt, setPrompt] = useState({});
  const [containerStyle, setContainerStyle] = useState({});
  const [textBoxStyle, setTextBoxStyle] = useState({});

  useEffect(() => {
    if (prompt.message) {
      setContainerStyle({
        top: '0px',
      });

      if (prompt.level === 'info') {
        setTextBoxStyle({
          backgroundColor: 'lightGreen',
        });
      } else if (prompt.level === 'warn') {
        setTextBoxStyle({
          backgroundColor: 'orange',
        });
      } else {
        setTextBoxStyle({
          backgroundColor: 'red',
        });
      }

      setTimeout(() => {
        setContainerStyle({
          top: '-80px',
        });
        setPrompt({});
      }, 3000);
    }
  }, [prompt]);

  return (
    <PromptContext.Provider value={setPrompt}>
      <div style={containerStyle} className={styles.container}>
        <div style={textBoxStyle} className={styles.prompt}>
          <p className={styles.message}>{prompt.message}</p>
        </div>
      </div>

      {children}
    </PromptContext.Provider>
  );
};
