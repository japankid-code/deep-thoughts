import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import {
  ApolloProvider, // provides data to componenents
  ApolloClient, // constructor, initializes connection to server
  InMemoryCache, // caches API responses for efficiency
  createHttpLink, // controls how client makes requests
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql", // links to GraphQL server
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  // set the http headers of every request to include the token!!
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // tie the auth and http links together!!
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
