import React, { useEffect } from "react";

// Definición de las props del componente
interface LoginModalProps {
  // Función para cerrar el modal
  onClose: () => void;
  // Función que se llama para redirigir al login
  onLoginRedirect: () => void;
  // Controla si el modal está visible o no
  isVisible: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onLoginRedirect,
}) => {
  useEffect(() => {
    // Obtenemos el elemento body
    const body = document.body;

    if (isVisible) {
      // Cuando el modal está visible, agregamos la clase para bloquear el scroll
      body.classList.add("overflow-hidden");

      // Opcional: También puedes añadir padding-right si tienes una barra de desplazamiento
      // visible para evitar que el contenido "salte"
      // body.style.paddingRight = '15px';
    } else {
      // Cuando el modal se oculta, removemos la clase para desbloquear el scroll
      body.classList.remove("overflow-hidden");
      // body.style.paddingRight = ''; // Quitar el padding extra
    }

    // Función de limpieza que se ejecuta cuando el componente se desmonta o
    // antes de que el efecto se vuelva a ejecutar
    return () => {
      body.classList.remove("overflow-hidden");
      // body.style.paddingRight = '';
    };
  }, [isVisible]); // Se ejecuta cada vez que 'isVisible' cambia

  // No renderizar si no es visible
  if (!isVisible) {
    return null;
  }

  // Manejador para cerrar el modal al hacer clic en el fondo (overlay)
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // 1. Modal Overlay (Fondo Transparente/Invisible)
    <div
      // CLASES ACTUALIZADAS:
      // Usamos bg-white y bg-opacity-0 para que el div ocupe todo el espacio
      // y capture el clic, pero sea visualmente invisible.
      className="fixed inset-0 bg-opacity-0 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleBackgroundClick}
    >
      {/* 2. Contenido del Modal (Caja Blanca) */}
      <div className="bg-opacity-50 bg-white/95 p-8 rounded-lg shadow-2xl w-full max-w-sm mx-4 transform scale-100 transition-transform duration-300 ease-out">
        {/* Botón de Cerrar (X) */}
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-3xl font-light leading-none cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          ¡Inicia Sesión para Continuar!
        </h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6">
          Para asegurar tu habitación y confirmar la reserva, por favor, inicia
          sesión o regístrate en nuestra plataforma.
        </p>

        {/* 3. Botones de Acción */}
        <div className="flex flex-col space-y-3">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out shadow-md cursor-pointer"
            onClick={onLoginRedirect}
          >
            Iniciar Sesión / Registrarse
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
