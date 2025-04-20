export interface IQueryParams {
    page: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: ISortOrder;
    filters?: string
    search?: string;
    to?: string;
    from?: string;
}

export enum ISortOrder {
    ASC = 'asc',
    DESC = 'desc'
}
export enum EnumState {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export enum EnumLang {
    ES = 'es',
    EN = 'en',
}
export enum EnumStatusJumpseller {
    AVAILABLE = "available",
    NOAVAILABLE = "not-available",
    DISABLED = "disabled"
}