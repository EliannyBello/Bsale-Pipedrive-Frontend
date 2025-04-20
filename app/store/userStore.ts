import { create } from 'zustand';
import { ISortOrder } from "@/app/api/common/interface/queryParams.interface";
import { IMeta } from "@/app/api/common/interface/apiResponse.interface";
import { ITEMS_PER_PAGE } from "@/app/api/common/api-client/app.api";
import { UsersResponse } from '../api/users/user.interface';
import { getUsers } from '../api/users/users.api';


interface UserStore {
    items: UsersResponse[]
    meta: IMeta;
    loading: boolean;
    error: string | null;
    filters: {
        page: number;
        limit: number;
        sortBy: string;
        sortOrder: ISortOrder;
        search: string;
        to?: string;
        from?: string;
        // state?: string;
    };
    setFilters: (filters: Partial<UserStore['filters']>) => void;
    fetchData: () => Promise<void>;
}

const mapOrders = (user: UsersResponse[]): UsersResponse[] => user.map(user => ({
        ...user,
    }));

export const usersStore = create<UserStore>((set, get) => ({
    items: [],
    meta: {
        totalItems: 0,
        itemsPerPage: ITEMS_PER_PAGE,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
    },
    loading: false,
    error: null,
    filters: {
        page: 1,
        limit: ITEMS_PER_PAGE,
        sortBy: 'createdAt',
        sortOrder: ISortOrder.DESC,
        search: '',
        to: '',
        from: '',
        // state: '',
    },
    setFilters: (newFilters) => {
        set(state => ({ filters: { ...state.filters, ...newFilters } }));
        get().fetchData();
    },
    fetchData: async () => {
        const { filters } = get();
        
        
        set({ loading: true, error: null });

        try {
            const queryParams = new URLSearchParams({
                page: filters.page.toString(),
                limit: filters.limit.toString(),
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
                ...(filters.search && { search: filters.search }),
                ...(filters.to && { to: filters.to }),
                ...(filters.from && { from: filters.from }),
                // ...(filters.state && { state: filters.state}),
            });

            const { items, meta } = await getUsers(queryParams.toString());
            console.log('bandera::',items);
            set({
                items: mapOrders(items),
                meta: meta,
                loading: false,
            });
        } catch (error) {
            console.error(error);
            set({ error: 'Error al cargar los datos', loading: false });
        }
    },
}));