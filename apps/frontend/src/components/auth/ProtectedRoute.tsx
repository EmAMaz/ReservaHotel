// src/components/ProtectedRoute.tsx

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router';

interface ProtectedRouteProps {
  // Opcional: El rol requerido. Si se omite, solo requiere 'isAuthenticated'.
  requiredRole?: string;
  // Opcional: La ruta a la que redirigir si no está autorizado
  redirectTo?: string; 
}

/**
 * Componente que protege una ruta, requiere autenticación o un rol específico.
 * @param requiredRole Opcional: El rol necesario para acceder.
 * @param redirectTo Opcional: Ruta a la que redirigir si no está autorizado (por defecto /login).
 * @returns El contenido de la ruta si está autorizado, o una redirección.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  redirectTo = '/login', // Redirige a /login por defecto
}) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  // 1. Verificar Autenticación
  if (!isAuthenticated) {
    // Si no está logeado, redirige
    return <Navigate to={redirectTo} replace />;
  }
  
  // 2. Verificar Rol Requerido (si se especificó)
  if (requiredRole && !hasRole(requiredRole)) {
    // Si está logeado pero no tiene el rol, redirige a una página de "Acceso Denegado"
    // (o podrías redirigir a una ruta de usuario normal como '/dashboard')
    return <Navigate to="/dashboard" replace />;
  }
  // 3. Autorizado: Renderiza el contenido anidado de la ruta
  return <Outlet />;
};