import {ApiResponse} from "@/types/api.base";
import {Track} from "@/api/track/types";

export type Room = {
  id: string;
  name?: string;
  created_at: string;
  tracks?: Track[];
};

export type TypeCreateRoom = {
  name?: string;
};

export type RoomApiResponse = ApiResponse<Room>;
export type CreateRoomApiResponse = ApiResponse<{ room_id: string }>;