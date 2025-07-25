/* eslint-disable @typescript-eslint/no-explicit-any */
import {ApiResponse, ApiResponseError, ApiResponseSuccess} from "@/types/api.base";

export type ApiAction<D = any> = {
  endpoint: string;
  data?: D;
  beforeSendCallback?: () => void;
  revalidate?: number;
  tags?: string[];
};

export default class ApiNext {
  static apiBaseUrl =
    process.env.NEXT_API_URL ?? "http://localhost:1337/api";
  static apiDomainUrl =
    process.env.NEXT_API_URL ?? "http://localhost:1337";
  static apiUploadUrl =
    process.env.NEXT_API_URL ?? "http://localhost:1337/upload";

  private static getFetchOptions(
    revalidate?: number,
    tags?: string[],
  ): RequestInit {
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEXT_API_TOKEN && {
          Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        }),
      },
      credentials: "include",
    };

    if (revalidate !== undefined || tags !== undefined) {
      options.next = {
        ...(revalidate !== undefined && { revalidate }),
        ...(tags && { tags }),
      };
    }

    return options;
  }

  private static async handleRequest<T>(
    response: Response,
  ): Promise<ApiResponse<T>> {
    const data = await response.json();


    if(!data.success && "error" in data) {
      return data as ApiResponseError;
    }

    if (!response.ok) {
      return this.handleErrorResponse(response, data);
    }

    if (data.success === true) {
      return data as ApiResponseSuccess<T>;
    }

    return {
      success: false,
      error: {
        message: "[request] An unknown error occurred"
      },
    } as ApiResponseError;
  }

  private static handleErrorResponse(
    response: Response,
    data: any,
  ): ApiResponseError {
    if (data.success === false) {
      return data as ApiResponseError;
    }

    return {
      success: false,
      error: {
        message: data.message || "[fetch] An unknown error occurred"
      },
    } as ApiResponseError;
  }

  static async post<T, D = any>(
    actionParams: ApiAction<D>,
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback, revalidate, tags } =
      actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        method: "POST",
        ...this.getFetchOptions(revalidate, tags),
        body: JSON.stringify(data),
      });

      return this.handleRequest<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async get<T, D = any>(
    actionParams: ApiAction<D>,
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback, revalidate, tags } =
      actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }


    console.log('terst: ', process.env.NEXT_API_URL);
    const url = new URL(`${this.apiBaseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        ...this.getFetchOptions(revalidate, tags),
      });

      return this.handleRequest<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async delete<T, D = any>(
    actionParams: ApiAction<D>,
  ): Promise<ApiResponse<T>> {
    const { endpoint, data, beforeSendCallback, revalidate, tags } =
      actionParams;

    if (typeof beforeSendCallback === "function") {
      beforeSendCallback();
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        method: "DELETE",
        ...this.getFetchOptions(revalidate, tags),
        body: JSON.stringify(data),
      });

      return this.handleRequest<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private static handleError(error: unknown): ApiResponseError {
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        return {
          error: { message: "The server is unavailable. Try again later." },
        } as ApiResponseError;
      }

      return {
        error: { message: error.message },
      } as ApiResponseError;
    }

    if(error instanceof TypeError && "code" in error) {
      if(error?.code === 'ECONNREFUSED') {
        return {
          error: { message: "The server is unavailable. Try again later." },
        } as ApiResponseError;
      }
    }

    return {
      error: { message: "An unknown error occurred" },
    } as ApiResponseError;
  }
}
