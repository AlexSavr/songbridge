import {ApiResponse} from "@/types/api.base";

export type Track = {
  id: string;
  title: string;
  url: string;
  added_at: string;
  room_id?: string;
};

export type AddTrack = {
  title: string;
  url: string;
};

export type TrackApiResponse = ApiResponse<Track>;
export type DeleteTrackApiResponse = ApiResponse<{ message: string }>;