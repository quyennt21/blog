import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useStaticQuery, graphql } from 'gatsby';
import MobileDetect from 'mobile-detect';

import { config as FaConfig } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { useColorMode } from 'theme-ui';

import './layout.scss';
import Header from '../Header';

import { actionCreators } from '../../state/actions';

import { throttle } from 'lodash';

FaConfig.autoAddCss = false;

interface LayoutPropsType {
  children: React.ReactNode;
}

const Layout = (props: LayoutPropsType) => {
  const { children } = props;
  const [isTop, setIsTop] = useState(true);
  const dispatch = useDispatch();
  const [colorMode] = useColorMode();
  const isDark = useMemo(() => colorMode === 'dark', [colorMode]);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `);

  const setTop = useCallback(
    throttle(() => setIsTop(window.pageYOffset < window.innerHeight / 2), 250),
    [],
  );

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
      dispatch(actionCreators.setIsMobile(true));
    }

    document.addEventListener('scroll', setTop);
    return () => document.removeEventListener('scroll', setTop);
  }, []);

  return (
    <>
      <div id="layout" className={isDark ? 'dark' : 'light'}>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div id="content">
          <main>{children}</main>
          <footer>
            <span>{`© ${new Date().getFullYear()} ${data.site.siteMetadata.author} | Theme by `}</span>
            <a href="https://github.com/junhobaik">JunhoBaik</a>
            <span>{` | Built with `}</span>
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>

        <div
          id="top"
          style={{
            opacity: isTop ? '0' : '1',
            pointerEvents: isTop ? 'none' : 'all',
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleUp} />
        </div>
      </div>
    </>
  );
};

export default Layout;
