import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, {createNetworkInterface} from 'apollo-client'
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import {Router, hashHistory, Route, IndexRoute} from 'react-router';
import App from './components/App'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  // link: new HttpLink(),
  // cache: new InMemoryCache(),
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="Dashboard" component={requireAuth(Dashboard)}/>
          <Route path="Login" component={LoginForm}/>
          <Route path="Register" component={RegisterForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root/>, document.querySelector('#root'));