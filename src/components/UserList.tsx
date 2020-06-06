import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import User, { UserRecord } from "./User";

const Row = ({ data, index, style }: ListChildComponentProps) => (
  <div style={style}>
    {data[index] ? <User user={data[index]} /> : <User placeholder />}
  </div>
);

export interface UserListProps {
  users: UserRecord[];
  usersCount: number;
  loadMoreUsers: (stopIndex: number) => Promise<void>;
}
export default function UserList({
  users,
  usersCount,
  loadMoreUsers,
}: UserListProps) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={(index) => index < users.length}
          itemCount={usersCount}
          loadMoreItems={(_, stopIndex) => loadMoreUsers(stopIndex)}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              className="List"
              height={height}
              itemCount={usersCount}
              itemData={users}
              itemSize={150}
              width={width}
              ref={ref}
              onItemsRendered={onItemsRendered}
            >
              {Row}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
