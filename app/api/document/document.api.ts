import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ICardDocument } from './document.interface';
import { IProductDocument } from './document.interface';
import { apiClient } from '../common/api-client/app.api';


const URL_BASE_CARDS = "magic-cards";
const URL_BASE_PRODUCTS = "products";

const apiClientInstance = async () => {
    const instance = await apiClient();
    if (!instance) throw new Error("Por favor inicie sesión nuevamente.");
    return instance;
};

// endpoint para cartas
export async function fetchAllCards(): Promise<ICardDocument[]> {
    const instance = await apiClientInstance();
    const { data } = await instance.get<ICardDocument[]>(`${URL_BASE_CARDS}/findAllCardsWithoutFilters`);
    return data;
}

// endpoint para productos
export async function fetchAllProducts(): Promise<IProductDocument[]> {
    const instance = await apiClientInstance();
    const { data } = await instance.get<IProductDocument[]>(`${URL_BASE_PRODUCTS}/findAllProductsWithoutFilters`);
    return data;
}

// funcion de exportar exel 
export function exportToExcel(data: any[], fileName: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
}

// transformacion de datos para exportar stock de productos 
export function transformProductsForExport(products: IProductDocument[]): any[] {
    const rows: any[] = [];

    products.forEach((product) => {
        if (product.stockHistory && product.stockHistory.length > 0) {
            product.stockHistory.forEach((entry) => {
                rows.push({
                    id: product.id,
                    _id: product._id,
                    name: product.name,
                    page_title: product.page_title,
                    description: product.description,
                    type: product.type,
                    days_to_expire: product.days_to_expire,
                    price: product.price,
                    discount: product.discount,
                    weight: product.weight,
                    stock: product.stock,
                    stock_unlimited: product.stock_unlimited,
                    stock_threshold: product.stock_threshold,
                    stock_notification: product.stock_notification,
                    cost_per_item: product.cost_per_item,
                    compare_at_price: product.compare_at_price,
                    sku: product.sku,
                    brand: product.brand,
                    barcode: product.barcode,
                    google_product_category: product.google_product_category,
                    featured: product.featured,
                    reviews_enabled: product.reviews_enabled,
                    status: product.status,
                    created_at: product.created_at,
                    updated_at: product.updated_at,
                    package_format: product.package_format,
                    length: product.length,
                    width: product.width,
                    height: product.height,
                    diameter: product.diameter,
                    permalink: product.permalink,
                    // Datos de stockHistory
                    quantityDiscounted: entry.quantityDiscounted,
                    date: entry.date,
                    orderId: entry.orderId,
                    previousStock: entry.previousStock,
                    newStock: entry.newStock,
                });
            });
        } else {
            rows.push({
                id: product.id,
                _id: product._id,
                name: product.name,
                page_title: product.page_title,
                description: product.description,
                type: product.type,
                days_to_expire: product.days_to_expire,
                price: product.price,
                discount: product.discount,
                weight: product.weight,
                stock: product.stock,
                stock_unlimited: product.stock_unlimited,
                stock_threshold: product.stock_threshold,
                stock_notification: product.stock_notification,
                cost_per_item: product.cost_per_item,
                compare_at_price: product.compare_at_price,
                sku: product.sku,
                brand: product.brand,
                barcode: product.barcode,
                google_product_category: product.google_product_category,
                featured: product.featured,
                reviews_enabled: product.reviews_enabled,
                status: product.status,
                created_at: product.created_at,
                updated_at: product.updated_at,
                package_format: product.package_format,
                length: product.length,
                width: product.width,
                height: product.height,
                diameter: product.diameter,
                permalink: product.permalink,
                // Datos de stockHistory vacíos cuando no hay historial de stock 
                quantityDiscounted: null,
                date: null,
                orderId: null,
                previousStock: null,
                newStock: null,
            });
        }
    });

    return rows;
}
