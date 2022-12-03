export interface ILoginDetail {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    role: number;
    status: number; //0: disabled, 1: active
    apiToken: string;
}
