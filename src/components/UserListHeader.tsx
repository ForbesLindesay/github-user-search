import React from "react";
import SortOrders, { SortOrder } from "../SortOrders";
import ChevronDownIcon from "../icons/ChevronDownIcon";

export interface UserListHeaderProps {
  count: number | null;
  sortOrder: SortOrder;
  onChangeSortOrder: (sortOrder: SortOrder) => void;
}
export default function UserListHeader({
  count,
  sortOrder,
  onChangeSortOrder,
}: UserListHeaderProps) {
  return (
    <header className="flex justify-between items-center py-3 lg:py-5">
      <h2 className="text-lg text-gray-800">
        {count === null ? (
          <div className="shimmer h-6 w-20 lg:w-40" />
        ) : (
          <>
            <span className="font-bold">{count}</span> users found
          </>
        )}
      </h2>
      <div className="relative">
        <select
          className="appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none focus:shadow-outline"
          value={sortOrder.name}
          onChange={(e) => {
            e.target.blur();
            const newSortOrder = SortOrders.find(
              (so) => so.name === e.target.value
            );
            if (newSortOrder) onChangeSortOrder(newSortOrder);
          }}
        >
          {SortOrders.map((so) => (
            <option key={so.name} value={so.name}>
              {so.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
