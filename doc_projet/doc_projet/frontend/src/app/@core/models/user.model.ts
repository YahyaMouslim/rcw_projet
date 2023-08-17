export interface User {
  _id: number;
  username: string;
  email: string;
  firstName:string;
  lastName:string;
  fullName : string;
  password: string;
  role: 'user' | 'admin';
  enabled: boolean;
}
