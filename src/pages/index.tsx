import React from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Bio from '../components/Bio';
import SEO from '../components/Seo';

import '../styles/index.scss';

interface IndexPageProps {
  path: string;
  data: any;
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const title = data.site.siteMetadata.title;

  return (
    <Layout>
      <SEO title={title} />
      <div className="index-wrap">
        <Bio />
        <div className="index-post-list-wrap">
          <PostList posts={posts} />
          {posts.length < 100 ? null : (
            <div className="show-more-posts">
              <div className="show-more-btn">
                <Link to="/search">
                  <FontAwesomeIcon icon={faSearch} />
                  <span>SHOW MORE POSTS</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 100) {
      edges {
        node {
          excerpt(truncate: true, format: PLAIN)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            update(formatString: "MMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;

export default IndexPage;
