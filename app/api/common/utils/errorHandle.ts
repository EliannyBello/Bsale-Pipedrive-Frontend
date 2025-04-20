import axios from "axios";
import {ErrorResponse} from "@/app/api/common/interface/error.interface";
export function handleError(error: ErrorResponse | unknown): { error: string } {
    if (axios.isAxiosError(error) && error.response) {
        return {
            error: error.response.data.message
        };
    }
    return { error: 'Ha ocurrido un Error Inesperado' };
}