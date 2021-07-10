import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import {
  ApolloProvider, // provides data to componenents
  ApolloClient, // constructor, initializes connection to server
  InMemoryCache, // caches API responses for efficiency
  createHttpLink, // controls how client makes requests
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql", // links to GraphQL server
});

const client = new ApolloClient({
  link: httpLink, // links to API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
