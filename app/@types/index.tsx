export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  role?: string;
  business?: BusinessProfileValues | null;
}

export interface BusinessProfileValues {
  name: string;
  description?: string;
  category?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  logo?: string | null;
}