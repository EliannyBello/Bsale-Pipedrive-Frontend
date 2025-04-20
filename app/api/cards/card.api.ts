import {apiClient} from "@/app/api/common/api-client/app.api";
import {IApiResponse} from "@/app/api/common/interface/apiResponse.interface";
import { ICard, ICardResponse } from "./card.interface";


const URL_BASE = "magic-cards";

const apiClientInstance = async () => {
    const instance = await apiClient();
    if (!instance) throw new Error("Por favor inicie sesión nuevamente.");
    return instance;
};

export async function getCards(query: string): Promise<IApiResponse<ICardResponse>> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IApiResponse<ICardResponse>>(`${URL_BASE}?${query}`);
    return data
}

export async function getCardId(_id: string): Promise<ICardResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<ICardResponse>(`${URL_BASE}/by-id/${_id}`);
    return data;
  }

export async function createCard(card: ICard): Promise<ICardResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.post<ICardResponse>(URL_BASE, card);
    return data;
}

export async function updateTransfers(card: ICard): Promise<ICardResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.put<ICardResponse>(`${URL_BASE}/${card._id}`, card);
    return data;
}   