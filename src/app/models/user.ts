export interface User {
  id: number;
  username: string;
  password: string;
  role: 'Employee' | 'HR' | string;
  
}
