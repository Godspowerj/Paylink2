export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
    business?: BusinessProfileValues| null;
    // add any other fields your API returns
}

export interface BusinessProfileValues {
  name: string
  businessEmail: string
  phone: string
  address: string
  logo?: string | null
}