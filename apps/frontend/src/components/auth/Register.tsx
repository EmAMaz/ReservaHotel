import React, { useState } from 'react';

// Interfaz para el estado del formulario de registro
interface RegisterFormState {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export const Register: React.FC = () => {
    // 1. Manejo del estado de los campos del formulario
    const [formData, setFormData] = useState<RegisterFormState>({
        name: '',
        lastName: '',
        email: '',
        password: '',
    });

    // 2. Función para manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 3. Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // **Lógica de Registro**
        // Aquí debes enviar `formData` a tu API para crear un nuevo usuario.
        console.log('Datos enviados para registro:', formData);
        
        // Ejemplo de una acción tras el registro exitoso:
        // alert(`Usuario ${formData.email} registrado exitosamente.`);
        // history.push('/login'); // Redirigir a la página de login o al dashboard
    };

    return (
        // Contenedor principal centrado y estilizado con fondo
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
                
                {/* 1. Encabezado */}
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crea tu Cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta? 
                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>

                {/* 2. Formulario de Registro */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        
                        {/* Campo Nombre */}
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="given-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Apellido */}
                        <div>
                            <label htmlFor="lastName" className="sr-only">
                                Apellido
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Apellido"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Campo Email */}
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Correo Electrónico"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Campo Contraseña */}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password" // Para indicar que es una nueva contraseña
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* 3. Botón de Envío */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* Icono de Usuario (SVG simple) */}
                                <svg className="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
