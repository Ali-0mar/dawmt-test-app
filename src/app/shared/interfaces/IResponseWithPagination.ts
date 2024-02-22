export interface IResponseWithPagination<T> {
  data: T[];
  pagination: {
    page: number;
    rpp: number;
  }
}

