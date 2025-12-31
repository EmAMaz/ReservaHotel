import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/AuthContext";
import { Header } from "./Header";

const queryClient = new QueryClient();

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  args: {
    onLoginClick: fn(),
    onRegisterClick: fn(),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "RoomBooker",
    onLoginClick: fn(),
    onRegisterClick: fn(),
    className: "fixed top-0 left-0 w-full bg-white shadow-md z-40",
  },
};

export const Admin: Story = {
  args: {
    title: "RoomBooker - Admin",
    onLoginClick: fn(),
    onRegisterClick: fn(),
    className: "fixed top-0 left-0 w-full bg-white shadow-md z-40",
  },
};
