import React from 'react';
import PropTypes from 'prop-types';
import { Link, StaticQuery, graphql } from 'gatsby';
import { css } from 'emotion';
import styled from 'react-emotion';
import { animation, colors } from '../config/styles';

const CatLink = styled(Link)`
  background-color: ${colors.text};
  border-radius: 1em;
  color: ${colors.lightest};
  line-height: 1;
  margin: 0 0.125rem;
  padding: 0.125rem 0.5rem 0.2rem;
  text-decoration: none;
  transition: background-color ${animation.transitionTime} linear;

  :focus,
  :hover,
  :active {
    background-color: ${colors.purple};
    border-radius: 1em;
  }
`;

const linkBlock = css`
  display: inline-block;
  margin-top: 0.25rem;

  & + & {
    margin-top: 0;
  }
`;

const CategoryLink = React.memo(({ category, block = false }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            categories {
              slug
              name
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { categories },
      },
    }) => {
      const cat = categories.find(c => c.slug === category) || {};

      return (
        <CatLink
          to={`/blog/category/${category}`}
          className={`${block && linkBlock}`}
        >
          {cat.name ? cat.name : category}
        </CatLink>
      );
    }}
  />
));

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  block: PropTypes.bool,
};

export default CategoryLink;
