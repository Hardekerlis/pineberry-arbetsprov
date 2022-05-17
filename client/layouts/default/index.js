import React from 'react';

import Head from 'next/head';

import styles from './default.module.sass';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Now this is pod-racing." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
};

export default Layout;
