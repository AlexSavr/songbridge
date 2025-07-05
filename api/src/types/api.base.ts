export interface ApiResponseSuccess<T = any> {
  success: true;
  data: T;
  error?: never;
}

export interface ApiResponseError<E = { message: string }> {
  success: false;
  data?: never;
  error: E;
}

export type TypeApiResponse<T = any> = ApiResponseSuccess<T> | ApiResponseError;
