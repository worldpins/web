import gql from 'graphql-tag';

export const mapQuery = gql`
  query map ($id: String!) {
    map (id: $id) {
      id
      name
      initialArea {
        latitude
        longitude
      }
      pins {
        id
        name
        data
        comment
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const mapsQuery = gql`
  query maps (
    $search: String
    $searchField: String
    $from: Int
    $limit: Int
    $sortField: String
    $sortDirection: String
  ) {
    maps (
      search: $search
      searchField: $searchField
      from: $from
      limit: $limit
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        comment
        initialArea {
          longitude
          latitude
        }
      }
      totalCount
      filteredCount
    }
  }
`;
