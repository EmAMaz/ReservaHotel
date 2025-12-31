import axios, { type Method } from "axios";
import { API_URL } from "../utils/constants";
import type { GETReservationResponseAPI, GETRoomByIdResponseAPI, GETRoomResponseAPI, RoomResponseAPI, UserResponseAPI } from "../utils/types";

export interface resultAuhtenticate {
   message: "User authenticated",
    data: {
        "data": {
            "id": string,
            "name": string,
            "lastname": string,
            "email": string,
            "role": string
        },
        "iat": number,
        "exp": number
    }
}

export default class ApiService {
  async request<T>({
    path,
    method,
    headers,
    body,
  }: {
    path: string;
    method: Method;
    headers?: Record<string, string>;
    body?: BodyInit;
  }): Promise<T> {
    const response = await axios.request({
      url: `${API_URL}${path}`,
      method,
      headers,
      data: body,
	  withCredentials: true,
    });

    return response.data as T;
  }

  async getRoomsList() {
    const rooms = await this.request<RoomResponseAPI>({
      path: "/room",
      method: "GET",
    });
    return rooms;
  }

  async getRoomsListPublic() {
    const rooms = await this.request<RoomResponseAPI>({
      path: "/room?filter=unique",
      method: "GET",
    });
    return rooms;
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    const user = await this.request<UserResponseAPI>({
      path: "/user/login",
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return user;
  }

  async logoutUser() {
    const user = await this.request<RoomResponseAPI>({
      path: "/user/logout",
      method: "POST",
    });
    return user;
  }

  async authenticateUser() {
    const result: resultAuhtenticate = await this.request({
      path: "/user/authenticate",
      method: "GET",
    });
    return result;
  }

  async reservateRoom({date, status, user, room, priceTotal}: {date: string, status: string, user: string, room: string, priceTotal: number}) {
    const result = await this.request({
      path: "/reservation",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        status,
        user,
        room,
        priceTotal
      }),
    });
    return result;
  }

  async getReservations() {
    const result = await this.request<GETReservationResponseAPI>({
      path: "/reservation",
      method: "GET",
    });
    return result;
  }

  async getRoomsAll() {
    const result = await this.request<GETRoomResponseAPI>({
      path: "/room",
      method: "GET",
    });
    return result;
  }

  async editRoom({id, type, capacity, description, image, price}: {id: string, type: string, capacity: number | "", description: string, image: string, price: number | ""}) {
    const result = await this.request({
      path: `/room/${id}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        capacity,
        description,
        image,
        price
      }),
    });
    return result;
  }


  async deleteRoom(id: string) {
    const result = await this.request({
      path: `/room/${id}`,
      method: "DELETE",
    });
    return result;
  }

  async deleteReservation(id: string) {
    const result = await this.request({
      path: `/reservation/${id}`,
      method: "DELETE",
    });
    return result;
  }

  async getRoomById(id: string) {
    const result = await this.request<GETRoomByIdResponseAPI>({
      path: `/room/${id}`,
      method: "GET",
    });
    return result;
  }

  async getReservationByUserId(id: string){
    const result = await this.request<GETReservationResponseAPI>({
      path: `/reservation/user/${id}`,
      method: "GET",
    });
    return result;
  }
}
