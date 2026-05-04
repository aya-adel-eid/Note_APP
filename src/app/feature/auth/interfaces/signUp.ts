export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SignUp {
  msg: string;
  user: User;
}
export interface SignUpFailure {
  msg: string;
  statusCode: number;
}
