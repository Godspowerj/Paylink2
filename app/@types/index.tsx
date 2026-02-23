export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    business?: {
        id: string;
        name: string;
    } | null;
    // add any other fields your API returns
}