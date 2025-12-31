import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";

interface HeaderProps {
  title: string;
  className: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onLoginClick,
  onRegisterClick,
  className
}) => {
  const { isAuthenticated, logout, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada");
  };

  return (
    <header className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {hasRole("ADMIN") ? (
              <a
                href="/"
                className="text-xl font-bold text-gray-900 tracking-wider"
              >
                🏨 {title}
              </a>
            ) : (
              <a
                href="/"
                className="text-2xl font-bold text-gray-900 tracking-wider"
              >
                🏨 {title}
              </a>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  children="Cerrar Sesión"
                  onClick={handleLogout}
                  className="px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out cursor-pointer"
                />
              </>
            ) : (
              <>
                <Button
                  children="Iniciar Sesión"
                  onClick={onLoginClick}
                  className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out font-medium cursor-pointer"
                />

                <Button
                  children="Registrarse"
                  onClick={onRegisterClick}
                  className="px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
