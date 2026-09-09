export interface User {
  id: string;
  name: string;
  email: string;
  code: string;
  createdAt: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  code: string;
  confirmCode: string;
}
