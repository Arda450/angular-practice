export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterRequest {
  givenName: string;
  familyName: string;
  email: string;
  password: string;
}
