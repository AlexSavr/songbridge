/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError } from "axios";
import {
  ApiResponse,
  ApiResponseError,
  ApiResponseSuccess,
} from "@/types/api.base";

export type ApiAction<D = any> = {
  endpoint: string;
  data?: D;
  beforeSendCallback?: () => void;
};

export default class ApiPromise {
  static apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337/api";
  static apiDomainUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
  static apiUploadUrl =
    process.env.NEXT_PUBLIC_UPLOAD_URL ?? "http://localhost:1337/upload";

  static axiosInstance = axios.create({
    baseURL: this.apiBaseUrl,
  });


  static async post<T, D = any>(
    actionParams: ApiAction<D>,
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback } = actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }

    try {
      const response = await this.axiosInstance.post(endpoint, data);
      return this.handleRequest(response.data);
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  static async get<T, D = any>(
    actionParams: ApiAction<D> & { revalidate?: number },
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback, revalidate } = actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }

    const headers: Record<string, string> = {};

    if (revalidate !== undefined) {
      headers["Cache-Control"] =
        `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`;
      headers["Next-Revalidate"] = revalidate.toString();
    }

    try {
      const response = await this.axiosInstance.get(endpoint, {
        params: data,
      });
      return this.handleRequest(response.data);
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  static async delete<T, D = any>(
    actionParams: ApiAction<D>,
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback } = actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }

    try {
      const response = await this.axiosInstance.delete(endpoint, {
        data,
      });
      return this.handleRequest(response.data);
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  private static handleRequest<T>(
    data: ApiResponse<T>,
  ): ApiResponse<T> {
    if(!data.success && "error" in data) {
      return data as ApiResponseError;
    }

    if (data.success) {
      return data as ApiResponseSuccess<T>;
    }

    return {
      success: false,
      error: {
        message: "[request] An unknown error occurred"
      },
    } as ApiResponseError;
  }

  private static handleErrorResponse(error: unknown): ApiResponseError {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        data: error.response.data?.data || {},
        error: error.response.data?.error || { message: error.message }
      };
    }

    if (error instanceof AxiosError) {
      return {
        success: false,
        error: {
          message: error.code === 'ECONNREFUSED'
            ? 'The server is unavailable. Try again later.'
            : error.message
        }
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: { message: error.message }
      };
    }

    return {
      success: false,
      error: { message: 'An unknown error occurred' }
    };
  }
}
