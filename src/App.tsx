import React, { useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import useSearchQuery from "./hooks/useSearchQuery";
import useDebouncedValue from "./hooks/useDebouncedValue";
import UserList from "./components/UserList";
import UserListHeader from "./components/UserListHeader";
import { DefaultSortOrder } from "./SortOrders";
import useGitHubUserSearch from "./hooks/useGitHubUserSearch";
import useStaleWhileNull from "./hooks/useStaleWhileNull";

function App() {
  const [query, setQuery] = useSearchQuery();
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const [sortOrder, setSortOrder] = useState(DefaultSortOrder);
  const [searchResults, loadMoreSearchResults] = useGitHubUserSearch(
    debouncedQuery && sortOrder.sort
      ? `${debouncedQuery} sort:${sortOrder.sort}`
      : debouncedQuery
  );
  const staleSearchResults = useStaleWhileNull(searchResults);
  return (
    <div className="container h-full pt-4 lg:pt-10 flex flex-col">
      <label className="pb-2 lg:pb-8">
        <div className="text-2xl font-sans font-light flex items-center">
          Search GitHub users
        </div>
        <div className="flex focus-within:shadow-outline mt-4 border py-3 px-2 rounded-md">
          <SearchIcon className="h-6 w-auto mr-2 text-gray-700" />
          <input
            className="outline-none flex-grow"
            type="text"
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            name="q"
            placeholder="Search GitHub users"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </label>
      {!query ? null : staleSearchResults?.ok ? (
        <>
          <UserListHeader
            count={staleSearchResults.userCount}
            sortOrder={sortOrder}
            onChangeSortOrder={setSortOrder}
          />
          <div className="overflow-hidden flex-grow">
            <UserList
              users={
                searchResults?.ok &&
                searchResults
                  ? searchResults.users
                  : []
              }
              usersCount={staleSearchResults.userCount}
              loadMoreUsers={loadMoreSearchResults}
            />
          </div>
        </>
      ) : staleSearchResults === null ? (
        <>
          <UserListHeader
            count={null}
            sortOrder={sortOrder}
            onChangeSortOrder={setSortOrder}
          />
          <div className="overflow-hidden flex-grow">
            <UserList
              users={[]}
              usersCount={10}
              loadMoreUsers={async () => {
                /* placeholder mode */
              }}
            />
          </div>
        </>
      ) : (
        <div>Could not load results</div>
      )}
    </div>
  );
}

export default App;
