import {ApiResponseError} from "@/types/api.base";
import ApiNext from "@/helpers/api.next";
import {Room} from "@/api/room/types";

type RoomParams = { id: string }

export const apiGetRoom = async ({ id }: RoomParams) => {
  const response = await ApiNext.get<Room>({
    endpoint: `/room/${id}`,
    revalidate: 300,
  });

  if("data" in response) {
    return response
  }

  if(response.error) {
    throw response.error
  }

  throw {
    error: { message: "[room] An unknown error occurred" },
  } as ApiResponseError;
};
