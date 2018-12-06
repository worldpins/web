import * as React from 'react';
import doGraphQLRequest from '../api/fetchQuery';

interface Props {
  render: (result: object) => React.ReactNode;
  query: string;
  variables: object;
}

interface State {
  error?: any;
  isLoading?: boolean;
  result?: object;
}

class Query extends React.Component<Props, State> {

  state: State = {}

  componentDidMount() {
    const { variables = {}, query } = this.props;
    this.setState({ isLoading: true });
    doGraphQLRequest({ body: JSON.stringify({ query, variables }), uri: 'http://localhost:3000/graphql'})
      .then((result: any) => {
        this.setState({ result, isLoading: false, error: null });
      })
      .catch((error: any) => {
        this.setState({ result: null, isLoading: false, error });
      });
  }

  render() {
    const { render } = this.props;
    return render(this.state);
  }

}

export default Query;
