import {apiClient} from "@/app/api/common/api-client/app.api";
import {IApiResponse} from "@/app/api/common/interface/apiResponse.interface";
import { IClientResponse } from "./client.interface";



const URL_BASE = "client";

const apiClientInstance = async () => {
    const instance = await apiClient();
    if (!instance) throw new Error("Por favor inicie sesión nuevamente.");
    return instance;
};

export async function getClient(query: string): Promise<IApiResponse<IClientResponse>> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IApiResponse<IClientResponse>>(`${URL_BASE}?${query}`);
    return data
}

export async function getClientId(_id: string): Promise<IClientResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IClientResponse>(`${URL_BASE}/by-id/${_id}`);
    return data;
  }


