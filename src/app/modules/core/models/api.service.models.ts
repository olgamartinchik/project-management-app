export interface UserModel {
  id: string;
  name: string;
  login: string;
}

export interface SignupRequestModel {
  name: string;
  login: string;
  password: string;
}

export interface LoginRequestModel {
  login: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
}

export interface EditUserResponseModel {
  id: string;
  name: string;
  login: string;
  password: string;
}
