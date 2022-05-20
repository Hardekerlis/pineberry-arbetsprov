import React from 'react';

import Layout from '../layouts/default';

import '../styles/global.sass';

import { PromptContextProvider } from 'contexts';

function App({ Component, pageProps }) {
  return (
    <PromptContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PromptContextProvider>
  );
}

export default App;
