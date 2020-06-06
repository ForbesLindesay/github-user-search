import { useState, useEffect } from "react";
import { UseQueryState, useClient, Client } from "urql";
interface User {
  avatarUrl: string;
  login: string;
  name?: string;
  url: string;
  email: string | null;
  followers?: { totalCount: number };
  repositories: { totalCount: number };
  createdAt: string;
  description?: string;
  bio?: string;
}
export type UsersResult =
  | null
  | { ok: true; users: User[]; userCount: number }
  | { ok: false; error: UseQueryState<unknown>["error"] };

const gqlQuery = `
  query Search($query: String! $after: String) {
    search (type:USER first:100 query:$query after: $after) { 
      nodes {
        ...on User {
          id
          avatarUrl(size: 100)
          login
          name
          url
          email
          followers {
            totalCount
          }
          repositories {
            totalCount
          }
          createdAt
          bio
        }
        ...on Organization {
          id
          avatarUrl
          login
          name
          url
          email
          repositories {
            totalCount
          }
          createdAt
          description
        }
      }
      userCount
      pageInfo {
        endCursor
      }
    }
  }
`;

type PaginatedSearchResult =
  | {
      ok: true;
      users: User[];
      userCount: number;
      loadMore: () => Promise<PaginatedSearchResult>;
    }
  | { ok: false; error: UseQueryState<unknown>["error"] };

async function getPaginatedSearch(
  query: string,
  client: Client
): Promise<PaginatedSearchResult> {
  async function loadPage(
    after: string | null,
    existingUsers: User[]
  ): Promise<PaginatedSearchResult> {
    const page = await client.query(gqlQuery, { query, after }).toPromise();

    if (page.error || !page.data) {
      console.error(page.error);
      return { ok: false, error: page.error };
    }
    const users = [...existingUsers, ...page.data.search.nodes];
    return {
      ok: true,
      userCount: page.data.search.userCount,
      users,
      loadMore: async () =>
        loadPage(page.data.search.pageInfo.endCursor, users),
    };
  }

  return loadPage(null, []);
}

export default function useGitHubUserSearch(
  query: string
): [UsersResult, (stopIndex: number) => Promise<void>] {
  const client = useClient();
  const [state, setState] = useState<{
    query: string;
    requestedEndIndex: number;
    value: null | PaginatedSearchResult;
    nextValue: null | Promise<PaginatedSearchResult>;
  }>();

  const onResolved = (
    value: PaginatedSearchResult,
    promise: Promise<PaginatedSearchResult>
  ) => {
    setState((state) =>
      state?.nextValue === promise
        ? { ...state, value, nextValue: null }
        : state
    );
  };

  useEffect(() => {
    if (state?.query !== query) {
      const nextValue = getPaginatedSearch(query, client);
      setState({ query, requestedEndIndex: 0, value: null, nextValue });
      nextValue.then((value) => onResolved(value, nextValue));
    } else if (
      !state.nextValue &&
      state.value?.ok &&
      state.requestedEndIndex >= state.value.users.length
    ) {
      const nextValue = state.value.loadMore();
      setState((state) => state && { ...state, nextValue });
      nextValue.then((value) => onResolved(value, nextValue));
    }
  }, [query, state, client]);

  const loadMore = async (endIndex: number) => {
    setState((s) => s && { ...s, requestedEndIndex: endIndex });
  };
  return [state?.value || null, loadMore];
}
