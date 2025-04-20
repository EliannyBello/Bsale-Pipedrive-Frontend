import {apiClient} from "@/app/api/common/api-client/app.api";
import {IApiResponse} from "@/app/api/common/interface/apiResponse.interface";
import { IProduct, IProductResponse } from "./product.interface";


const URL_BASE = "products";

const apiClientInstance = async () => {
    const instance = await apiClient();
    if (!instance) throw new Error("Por favor inicie sesión nuevamente.");
    return instance;
};

export async function getProducts(query: string): Promise<IApiResponse<IProductResponse[]>> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IApiResponse<IProductResponse[]>>(`${URL_BASE}?${query}`);
    return data
}

export async function getProductById(_id: string): Promise<IProductResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IProductResponse>(`${URL_BASE}/by-id/${_id}`);
    return data;
  }

export async function createProduct(product: IProduct): Promise<IProductResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.post<IProductResponse>(URL_BASE, product);
    return data;
}

export async function updateProduct(product: IProduct): Promise<IProductResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.put<IProductResponse>(`${URL_BASE}/${product.id}`, product);
    return data;
}   