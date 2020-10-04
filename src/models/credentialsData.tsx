import { Id } from "../const/structuresConst";
import { Login } from "../const/userConst";

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  login: Login;
}

export interface UserData {
  login: Login;
  id: Id;
}
