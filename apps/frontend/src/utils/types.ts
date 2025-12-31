export type RoomResponseAPI = {
  message: string;
  data: any;
};

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export interface UserResponseAPI {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export interface Room {
  id: number;
  roomNumber: number;
  type: string;
  capacity: number;
  description: string;
  image: string;
  price: number;
}

export interface Reservation {
  id: number;
  date: string;
  status: string;
  user: User;
  room: Room;
  priceTotal: number;
}

export interface GETReservationResponseAPI {
  message: string;
  data: [
    {
      id: number;
      date: string;
      status: string;
      user: User;
      room: Room;
      priceTotal: string;
    }
  ];
  token: string;
}

export interface GETRoomResponseAPI {
  message: string;
  data: [
    {
      id: number;
      roomNumber: number;
      type: string;
      capacity: number;
      description: string;
      image: string;
      price: number;
    }
  ];
  token: string;
}

export interface GETRoomByIdResponseAPI {
  message: string;
  data: {
    id: number;
    roomNumber: number;
    type: string;
    capacity: number;
    description: string;
    image: string;
    price: number;
  };
}


export interface RoomType {
  id: number;
  roomNumber: number;
  type: string;
  capacity: number;
  description: string;
  image: string;
  price: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  hasRole: (requiredRole: string) => boolean;
}
