export class PagedResult<T>{
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalRecords: number;
    pageCount: number;
}
