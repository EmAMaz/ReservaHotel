// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../utils/types";
import ApiService from "../service/apiService";

// Define el valor por defecto (se usará un valor nulo, pero tipado)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor de Contexto para envolver tu aplicación.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const apiService = new ApiService();

  // Derivación de estado
  const isAuthenticated = !!user;

  // Funciones de manejo
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    await apiService.logoutUser();
    setUser(null);
  };

  /** Verifica si el usuario actual tiene un rol específico. */
  const hasRole = (requiredRole: string): boolean => {
    if (!user) return false;
    const userRole = user.role.toUpperCase();
    const required = requiredRole.toUpperCase();

    return userRole === required;
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom Hook para consumir el contexto de autenticación.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
