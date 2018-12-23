import gql from 'graphql-tag';

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
