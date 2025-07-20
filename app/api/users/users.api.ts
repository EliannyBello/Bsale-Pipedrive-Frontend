import {apiClient} from "@/app/api/common/api-client/app.api";
import {IApiResponse} from "@/app/api/common/interface/apiResponse.interface";
import { UsersResponse } from "./user.interface";


const URL_BASE = "users";

const apiClientInstance = async () => {
    const instance = await apiClient();
    if (!instance) throw new Error("Por favor inicie sesión nuevamente.");
    return instance;
};

export async function getUsers(query: string): Promise<IApiResponse<UsersResponse[]>> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<IApiResponse<UsersResponse[]>>(`${URL_BASE}?${query}`);
    return data;
}

export async function getUserId(_id: string): Promise<UsersResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.get<UsersResponse>(`${URL_BASE}/${_id}`);
    return data;
  }

export async function createUser(user: UsersResponse): Promise<UsersResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.post<UsersResponse>(URL_BASE, user);
    return data;
}

export async function updateUser(user: UsersResponse): Promise<UsersResponse> {
    const instance = await apiClientInstance();
    const {data} = await instance.put<UsersResponse>(`${URL_BASE}/${user._id}`, user);
    return data;
}   

export async function deleteUser(userId: string): Promise<void> {
    const instance = await apiClientInstance();
    await instance.delete<UsersResponse>(`${URL_BASE}/${userId}`);
}

