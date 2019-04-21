import * as React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import publicMapsQuery from './_queries.gql';
import Spinner from '../../../common/Spinner';
import { Link } from 'react-router-dom';

const LinksWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

const LinkWrapper = styled.div`
  background: #1e90ff;
  padding: 12px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

interface MapItem {
  id: string;
  name: string;
  published: boolean;
}

interface MapData {
  publicMaps: {
    filteredCount: number;
    items: [MapItem]
    totalCount: number;
  };
}

interface MapVariables {
  from?: number;
  limit?: number;
}

const PublicMaps = () => (
  <React.Fragment>
    <h2>Maps</h2>
    <p>Here you will see any published maps</p>
    <Query<MapData, MapVariables> query={publicMapsQuery}>
      {({ loading, data }) => {
        if (loading) return <Spinner />;
        return (
          <LinksWrapper>
            {data && data.publicMaps.items.map(({ id, name }) => (
              <LinkWrapper key={id}>
                <StyledLink to={`/home/${id}`}>{name}</StyledLink>
              </LinkWrapper>
            ))}
          </LinksWrapper>
        );
      }}
    </Query>
  </React.Fragment>
);

export default React.memo(PublicMaps);
