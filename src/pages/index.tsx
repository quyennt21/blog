import React from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexRoute = (props: PageProps) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi, </h1>
      <p>Welcome to my blog.</p>
      <p>Now blog is under development.</p>
    </Layout>
  );
};

export default IndexRoute;
