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

export type { SignupResp, AuthError };
