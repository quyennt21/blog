import React, { ReactNode } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './header';

interface Props {
  children: ReactNode;
}

const useSiteTitle = () => {
  const data = useStaticQuery(
    graphql`
      query SiteTitle {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );
  return data?.site?.siteMetadata?.title || '';
};

const Layout: React.FC<Props> = ({ children }) => {
  const title = useSiteTitle();
  return (
    <>
      <Header siteTitle={title} />
      <div
        style={{
          margin: `0px auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, by Quyen. All rights reserved.</footer>
      </div>
    </>
  );
};

export default Layout;
