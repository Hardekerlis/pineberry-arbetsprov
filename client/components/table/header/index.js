import React from 'react';

import styles from './header.module.sass';

import { Cell } from '../cell';

const Header = ({ editable, children }) => {
  return <Cell className={styles.header}>{children}</Cell>;
};

export { Header };
