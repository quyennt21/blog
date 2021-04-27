import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      id="notFound"
      style={{
        maxWidth: '720px',
        padding: '1rem',
        margin: '0 auto',
        marginTop: '3rem',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <h1 style={{ fontSize: '5rem', margin: '0.5rem 0 1rem 0' }}>404</h1>
      <p>{`That page doesn't exist or is unavailable.`}</p>
    </div>
  </Layout>
);

export default NotFoundPage;
