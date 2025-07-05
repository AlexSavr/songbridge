/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponseSuccess<T = any> {
  success: boolean;
  data: T;
  error?: never;
}

export interface ApiResponseError {
  success: boolean;
  data?: undefined;
  error: {
    message: string;
  };
}

export type ApiResponse<T = any> = ApiResponseSuccess<T> | ApiResponseError;