export interface User {
  name: string;
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  image?: {url?: string; public_id?: string};
  role?: string;
}
