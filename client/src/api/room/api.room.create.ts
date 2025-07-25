import {ApiResponseError} from "@/types/api.base";
import {Room} from "@/api/room/types";
import ApiPromise from "@/helpers/api.promise";

export const apiCreateRoom = async () => {
  const response = await ApiPromise.post<{ room: Room }>({
    endpoint: `/room/create`,
  });

  if(response.success) {
    return response.data
  }

  if(response.error) {
    throw response.error
  }

  throw {
    error: { message: "[create room] An unknown error occurred" },
  } as ApiResponseError;
};
