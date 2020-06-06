export interface SortOrder {
  name: string;
  sort: string | null;
}

const SortOrders: SortOrder[] = [
  { name: "Best match", sort: null },
  { name: "Most followers", sort: "followers" },
  { name: "Fewest followers", sort: "followers-asc" },
  { name: "Most recently joined", sort: "joined" },
  { name: "Least recently joined", sort: "joined-asc" },
];

export const DefaultSortOrder = SortOrders[0];

export default SortOrders;
