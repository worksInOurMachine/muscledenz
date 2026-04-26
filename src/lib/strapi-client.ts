// Strapi API client with comprehensive error handling and type safety

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

export interface StrapiResponse<T = any> {
  data?: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: StrapiError;
}

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  phone: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface SendOTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export class StrapiClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL?: string) {
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      const isServer = typeof window === 'undefined';
      const root = isServer ? (process.env.NEXTAUTH_URL || 'http://localhost:3000') : '';
      this.baseURL = `${root}/api`;
    }
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            status: response.status,
            name: data.error?.name || "APIError",
            message: data.error?.message || data.message || "An error occurred",
            details: data.error?.details || data.details,
          },
        };
      }

      return { data };
    } catch (error) {
      console.error("Strapi API request failed:", error);
      return {
        error: {
          status: 0,
          name: "NetworkError",
          message: "Network request failed. Please check your connection.",
        },
      };
    }
  }

 
 

  // User management endpoints
  async getMe(jwt: string): Promise<StrapiResponse<StrapiUser>> {
    return this.request("/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  async updateProfile(
    jwt: string,
    data: Partial<StrapiUser>
  ): Promise<StrapiResponse<StrapiUser>> {
    return this.request("/users/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Generic authenticated request
  async authenticatedRequest<T = any>(
    endpoint: string,
    jwt: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    return this.request(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...options.headers,
      },
    });
  }
}

// Export singleton instance
export const strapiClient = new StrapiClient();
