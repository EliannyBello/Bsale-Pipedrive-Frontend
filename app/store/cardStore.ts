import { create } from 'zustand';
import { ISortOrder } from "@/app/api/common/interface/queryParams.interface";
import { IMeta } from "@/app/api/common/interface/apiResponse.interface";
import { ITEMS_PER_PAGE } from "@/app/api/common/api-client/app.api";
import { ICardResponse } from '../api/cards/card.interface';
import { getCards } from '../api/cards/card.api';


interface CardStore {
    items: ICardResponse[]
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
        status?: string;
        lang?: string;
    };
    setFilters: (filters: Partial<CardStore['filters']>) => void;
    fetchData: () => Promise<void>;
}

const mapOrders = (card: ICardResponse[]): ICardResponse[] => card.map(card => ({
        ...card,
    }));

export const useCardStore = create<CardStore>((set, get) => ({
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
        status: '',
        lang: '',
    },
    setFilters: (newFilters) => {
        set(status => ({ filters: { ...status.filters, ...newFilters } }));
        set(lang => ({ filters: { ...lang.filters, lang: newFilters.lang } }));
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
                ...(filters.status && { status: filters.status}),
                ...(filters.lang && { lang: filters.lang }),
            });

            const { items, meta } = await getCards(queryParams.toString());
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