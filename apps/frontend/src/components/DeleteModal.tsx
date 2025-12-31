import Button from "./Button/Button";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    handleDeleteRoom: () => void;
}

export const DeleteModal = ({isOpen, onClose, handleDeleteRoom}: Props) => {
if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 transform transition-all">
        {/* Icono de advertencia */}
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-gray-900">¿Confirmar eliminación?</h3>
          <p className="mt-2 text-sm text-gray-500">
            Estás a punto de eliminar una habitación. Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteRoom}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};
