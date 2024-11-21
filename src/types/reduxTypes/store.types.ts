export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  bearerToken: null;
  refreshToken: null;
  loading: boolean;
  error: string | null;
}
