// Adjust these types according to your data structure
export interface TableDataItem {
  id: string;
  [key: string]: any;
}

export interface FetchDataParams {
  page: number;
  pageSize: number;
  search?: string;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
}

export interface FetchDataResult<T> {
  data: T[];
  totalCount: number;
}

export interface UseTableParams<T> {
  fetchData: (params: FetchDataParams) => Promise<FetchDataResult<T>>;
  countPerPage?: number;
}
