import React from 'react';

import Layout from '../layouts/default';

import '../styles/global.sass';

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
