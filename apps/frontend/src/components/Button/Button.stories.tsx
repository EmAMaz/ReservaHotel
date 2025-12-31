import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    children: "Iniciar Sesión",
    onClick: fn(),
    className: "text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out font-medium cursor-pointer",
  },
};

export const Register: Story = {
  args: {
    children: "Registrarse",
    onClick: fn(),
    className: "px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer",
  },
};

export const Logout: Story = {
  args: {
    children: "Cerrar Sesión",
    onClick: fn(),
    className: "px-4 py-1.5 text-sm font-semibold rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out cursor-pointer",
  },
};

export const ReserveRoom: Story = {
  args: {
    children: "Reservar",
    onClick: fn(),
    className: "flex w-full rounded-lg h-12 items-center bg-green-600 mt-2 text-center justify-center text-white p-2 cursor-pointer",
  },
};

// export const Delete: Story = {
//   args: {
//     children: "Eliminar",
//     onClick: fn(),
//     className: "bg-red-500/80 p-2 rounded-xl cursor-pointer ",
//   },
// };

export const Edit: Story = {
  args: {
    children: "Editar",
    onClick: fn(),
    className: "flex-1 px-4 py-2 text-white rounded-lg bg-green-500/70 p-2 hover:bg-green-500/70 font-medium transition-colors cursor-pointer",
  },
};


export const Saved: Story = {
  args: {
    children: "Guardar",
    onClick: fn(),
    type: "submit",
    className: "bg-green-500/80 w-full py-2 px-4 rounded-md text-white font-semibold transition duration-150 cursor-pointer hover:bg-green-500 mt-6",
  },
};

export const Cancel: Story = {
  args: {
    children: "Cancelar",
    onClick: fn(),
    className: "flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors cursor-pointer",
  },
};


export const Delete: Story = {
  args: {
    children: "Eliminar",
    onClick: fn(),
    className: "flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors cursor-pointer",
  },
};