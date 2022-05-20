import React from 'react';

import styles from './dropdownItem.module.sass';

const DropdownItem = ({ children, setSelected, value }) => {
  const select = () => {
    setSelected(value);
  };

  return (
    <div onClick={select} className={styles.container}>
      {children}
    </div>
  );
};

export { DropdownItem };
