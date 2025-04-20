import { StockHistoryEntry } from "../products/product.interface";

export interface ICardDocument {
    _id: string;
    oracleId?: string;
    name?: string;
    printedName?: string;
    lang: string;
    uri?: string;
    layout?: string;
    manaCost?: string;
    cmc?: number;
    typeLine?: string;
    printedTypeLine?: string;
    colors?: string[];
    colorIdentity?: string[];
    keywords?: string[];
}

export interface IProductDocument {
    id: number;
    _id: string;
    name: string;
    page_title: string;
    description: string;
    type: string;
    days_to_expire: number;
    price: number;
    discount: number;
    weight: number;
    stock: number;
    stock_unlimited: boolean;
    stock_threshold: number;
    stock_notification: boolean;
    cost_per_item: number;
    compare_at_price: number;
    sku: string;
    brand: string;
    barcode: string;
    google_product_category: string;
    featured: boolean;
    reviews_enabled: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    package_format: string;
    length: number;
    width: number;
    height: number;
    diameter: number;
    permalink: string;
    stockHistory?: StockHistoryEntry[];
}