interface SignupResp {
  email: string;
  id: string;
}

interface AuthError {
  errors: {
    message: string;
    field: string;
  }[];
}

interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}

export type { SignupResp, AuthError, CurrentUser };
