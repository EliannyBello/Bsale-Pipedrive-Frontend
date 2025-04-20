export interface AuthResponse {
    access_token: string;
    user: IUser;
}
interface IUser {
    id: string;
    email: string;
    name: string;
    role: string;
}
