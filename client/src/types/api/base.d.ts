export interface PageQueryParam {
  page: number;
  pageSize: number;
}

export interface PageResult<T> {
  list: T;
  total: number;
}

interface PageOrder {
  asc: boolean,
  column: string;
}

export interface PageOrderParam {
  order?: PageOrder[]
}
