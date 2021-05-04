import React, { useEffect, useState, useCallback, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faLayerGroup, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { throttle } from 'lodash';

import Layout from '../components/Layout';
import Toc from '../components/Toc';
import SEO from '../components/Seo';
import ReadingProgress from '../components/ReadingProgress';

import '../styles/post.scss';
import '../styles/code-theme.scss';
import '../styles/md-style.scss';

interface PostProps {
  data: any;
  pageContext: { slug: string; series: any[]; lastmod: string };
}

const Post: React.FC<PostProps> = ({ data, pageContext }) => {
  const [yList, setYList] = useState([] as number[]);
  const [isInsideToc, setIsInsideToc] = useState(false);
  const target = useRef(null);
  const { markdownRemark } = data;
  const { frontmatter, html, tableOfContents, fields, excerpt } = markdownRemark;
  const { title, date, tags, keywords } = frontmatter;
  let update = frontmatter.update;
  if (Number(update?.split(',')[1]) === 1) update = null;
  const { slug } = fields;
  const { series } = pageContext;
  const isTableOfContents = tableOfContents !== '';

  const mapTags = tags.map((tag: string) => {
    return (
      <li key={tag} className="blog-post-tag">
        <Link to={`/tags#${tag}`}>{`#${tag}`}</Link>
      </li>
    );
  });

  const mapSeries = series.map((s: any) => {
    return (
      <li key={`${s.slug}-series-${s.num}`} className={`series-item ${slug === s.slug ? 'current-series' : ''}`}>
        <Link to={s.slug}>
          <span>{s.title}</span>
          <div className="icon-wrap">{slug === s.slug ? <FontAwesomeIcon icon={faAngleLeft} /> : null}</div>
        </Link>
      </li>
    );
  });

  const metaKeywords = useCallback((keywordList: string[], tagList: string[]) => {
    const resultKeywords = new Set();
    for (const v of [...keywordList, ...tagList]) resultKeywords.add(v);

    return Array.from(resultKeywords) as string[];
  }, []);

  useEffect(() => {
    const setYPos = () => {
      if (yList) {
        const index =
          yList.filter((v: number) => {
            return v < window.pageYOffset;
          }).length - 1;

        const aList = document.querySelectorAll('.toc.outside li a') as NodeListOf<HTMLAnchorElement>;

        for (const i in Array.from(aList)) {
          if (parseInt(i, 10) === index) {
            aList[i].style.opacity = '1';
          } else {
            aList[i].style.opacity = '0.4';
          }
        }
      }
    };

    if (isTableOfContents) document.addEventListener('scroll', setYPos);
    return () => {
      if (isTableOfContents) document.removeEventListener('scroll', setYPos);
    };
  }, [yList]);

  useEffect(() => {
    const postContentOriginTop = document.querySelector('.blog-post')?.getBoundingClientRect().top ?? 0;

    const removeScrollEvent = () => document.removeEventListener('scroll', scrollEvents);
    const scrollEvents = throttle(() => {
      const postContentHeight = document.querySelector('.blog-post')?.getBoundingClientRect().height ?? Infinity;
      if (window.scrollY + window.innerHeight * 1.75 - postContentOriginTop > postContentHeight) {
        removeScrollEvent();
      }
    }, 250);
    scrollEvents();
    document.addEventListener('scroll', scrollEvents);
    const hs = Array.from(document.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const minusValue = window.innerHeight < 500 ? 100 : Math.floor(window.innerHeight / 5);
    const yPositions = hs.map((h) => h.offsetTop - minusValue);
    setYList(yPositions);

    return () => removeScrollEvent();
  }, []);

  return (
    <>
      <SEO title={title} description={excerpt} keywords={metaKeywords(keywords, tags)} />
      <ReadingProgress target={target} />
      <Layout>
        <div className="blog-post-container" ref={target}>
          <div className="blog-post">
            <h1 className="blog-post-title">{title}</h1>
            <div className="blog-post-info">
              <div className="date-wrap">
                <span className="write-date">{date}</span>
                {update ? (
                  <>
                    <span>(</span>
                    <span className="update-date">{`Last updated: ${update}`}</span>
                    <span>)</span>
                  </>
                ) : null}
              </div>

              {tags.length && tags[0] !== 'undefined' ? (
                <>
                  <span className="dot">·</span>
                  <ul className="blog-post-tag-list">{mapTags}</ul>
                </>
              ) : null}

              {!isTableOfContents ? null : (
                <div className="blog-post-inside-toc">
                  <div
                    className="toc-button"
                    role="button"
                    onClick={() => {
                      setIsInsideToc((prev: boolean) => {
                        return !prev;
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faListUl} />
                  </div>
                </div>
              )}
            </div>

            {!isTableOfContents ? null : (
              <div className="inside-toc-wrap" style={{ display: isInsideToc ? 'flex' : 'none' }}>
                <Toc isOutside={false} toc={tableOfContents} />
              </div>
            )}

            {series.length > 1 ? (
              <>
                <div className="series">
                  <div className="series-head">
                    <span className="head">Post Series</span>
                    <div className="icon-wrap">
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </div>
                  </div>
                  <ul className="series-list">{mapSeries}</ul>
                </div>
              </>
            ) : null}
            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
        {!isTableOfContents ? null : <Toc isOutside={true} toc={tableOfContents} />}
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(truncate: true, format: PLAIN)
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        tags
        keywords
        update(formatString: "MMM DD, YYYY")
      }
    }
  }
`;

export default Post;
