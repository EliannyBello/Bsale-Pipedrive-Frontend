export interface IApiResponse<T> {
    items: T[]
    meta: IMeta
}
export interface IMeta {
    totalItems: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface INewApiResponse<T> {
    total: number
    page: number
    limit: number
    totalPages: number
    data: T[]
}