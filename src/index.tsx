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

const client = createUrqlClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      // this token has no actual permissions associated with it
      Authorization: `Bearer 28da939e5c3ca2e3a6c6426288600b38284b8400`,
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
