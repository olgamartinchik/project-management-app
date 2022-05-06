export interface SignupRequestModel {
  name: string;
  login: string;
  password: string;
}

export interface SignupResponseModel {
  id: string;
  name: string;
  login: string;
}

export interface LoginRequestModel {
  login: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
}
