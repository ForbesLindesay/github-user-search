import React from "react";
import ReactDOM from "react-dom";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
  dedupExchange,
  fetchExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import "./tailwind.generated.css";
import App from "./App";

function getSessionCookie() {
  return document.cookie.split(';').map(v => v.trim()).find(v => v.startsWith('access_token='))?.substr('access_token='.length)
}
const client = createUrqlClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      // to run in Create React App, set the REACT_APP_ACCESS_TOKEN env var
      Authorization: `Bearer ${getSessionCookie() || process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          todos: relayPagination(),
        },
      },
    }),
    fetchExchange,
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
