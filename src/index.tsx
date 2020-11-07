import React from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './state/store';
import { Provider } from 'react-redux';

import './index.css';

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token') ?? process.env.REACT_APP_DB_KEY}`
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allTodos: {
            merge(_, incoming) {
              return incoming;
            }
          },
          list: {
            merge(_, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
