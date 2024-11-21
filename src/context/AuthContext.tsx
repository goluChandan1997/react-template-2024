import React, { createContext, useContext, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContextType } from "../types/auth.types";
import { AppDispatch, RootState } from "../store/store";
import { authStateAction } from "../store/slices/authSlice";
import { loginUser } from "../store/actions/authActions";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // await dispatch(loginUser({ email, password })).unwrap();
      } catch (err: any) {
        console.error("Login failed:", err.message || err);
        throw new Error(err.message || "An error occurred during login.");
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    // dispatch(authStateAction.logout());
    // Add additional cleanup if necessary
  }, [dispatch]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout: handleLogout,
      loading,
      error,
    }),
    [user, isAuthenticated, login, handleLogout, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("context", context);
  if (context === undefined) {
    if (process.env.NODE_ENV === "development") {
      console.warn("useAuth must be used within an AuthProvider");
    }
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
