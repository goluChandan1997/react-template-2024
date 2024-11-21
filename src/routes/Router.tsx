import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { routes } from "../config/routes";

const Loading: React.FC = () => <div>Loading...</div>;

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const Router: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map(({ path, component: Component, auth }) => (
          <Route
            key={path}
            path={path}
            element={
              auth ? (
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};
