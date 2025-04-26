export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface authPayload {
  dni: string;
  password: string;
}

export interface User {
  id: number;
  dni: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

// src/types/auth.ts

export interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    refresh: string;
    access: string;
    role: string;
    user: {
      id: number;
      dni: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      address: string;
      role: string;
      is_active: boolean;
    };
  };
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  errors: {
    [key: string]: string[];
  };
}

// Una union de ambas
export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
