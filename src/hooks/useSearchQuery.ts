import { createBrowserHistory } from "history";
import { useState, useEffect, useCallback } from "react";

const history = createBrowserHistory();

function getQuery() {
  return new URLSearchParams(history.location.search).get("q") || "";
}
export default function useSearchQuery() {
  const [query, setQueryLocal] = useState(getQuery);

  useEffect(() => {
    ;
    history.listen(() => {
      const q = getQuery();
      setQueryLocal(q);
    });
  }, []);

  const setQuery = useCallback((q: string) => {
    if (q) {
      const search = new URLSearchParams(history.location.search);
      search.set("q", q);
      history.replace({ search: search.toString() });
    } else {
      history.replace({ search: "" });
    }
  }, []);

  return [query, setQuery] as const;
}
