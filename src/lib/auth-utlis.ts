// API utilities and helper functions

import type { StrapiError, StrapiResponse } from "./strapi-client";

export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

// Convert Strapi response to standardized API result
export function handleStrapiResponse<T>(
  response: StrapiResponse<T>
): ApiResult<T> {
  if (response.error) {
    return {
      success: false,
      error: response.error.message,
      statusCode: response.error.status,
    };
  }

  return {
    success: true,
    data: response.data,
  };
}

// Phone number validation and formatting
export function validatePhoneNumber(phone: string): {
  isValid: boolean;
  error?: string;
} {
  if (!phone) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  // Check if it starts with + and has country code
  if (!cleanPhone.startsWith("+")) {
    return { isValid: false, error: "Phone number must include country code" };
  }

  // Check minimum length (country code + number)
  if (cleanPhone.length < 10) {
    return { isValid: false, error: "Phone number is too short" };
  }

  // Check maximum length
  if (cleanPhone.length > 15) {
    return { isValid: false, error: "Phone number is too long" };
  }

  return { isValid: true };
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/[^\d+]/g, "");

  // Basic formatting for common patterns
  if (cleanPhone.startsWith("+1") && cleanPhone.length === 12) {
    // US/Canada format: +1 (XXX) XXX-XXXX
    const match = cleanPhone.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 (${match[1]}) ${match[2]}-${match[3]}`;
    }
  }

  return cleanPhone;
}

// OTP validation
export function validateOTP(
  otp: string,
  expectedLength = 6
): { isValid: boolean; error?: string } {
  if (!otp) {
    return { isValid: false, error: "OTP is required" };
  }

  if (!/^\d+$/.test(otp)) {
    return { isValid: false, error: "OTP must contain only numbers" };
  }

  if (otp.length !== expectedLength) {
    return { isValid: false, error: `OTP must be ${expectedLength} digits` };
  }

  return { isValid: true };
}

// Error message mapping
export function getErrorMessage(error: StrapiError | string): string {
  if (typeof error === "string") {
    return error;
  }

  // Map common Strapi errors to user-friendly messages
  const errorMap: Record<string, string> = {
    ValidationError: "Please check your input and try again",
    ApplicationError: "Something went wrong. Please try again",
    UnauthorizedError: "You are not authorized to perform this action",
    ForbiddenError: "Access denied",
    NotFoundError: "The requested resource was not found",
    RateLimitError: "Too many requests. Please wait and try again",
    NetworkError: "Network error. Please check your connection",
  };

  return (
    errorMap[error.name] || error.message || "An unexpected error occurred"
  );
}

// Retry logic for API requests
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
}

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);

    return true;
  }

  getRemainingTime(key: string, windowMs: number): number {
    const requests = this.requests.get(key) || [];
    if (requests.length === 0) return 0;

    const oldestRequest = Math.min(...requests);
    const remainingTime = windowMs - (Date.now() - oldestRequest);

    return Math.max(0, remainingTime);
  }
}

// Export singleton rate limiter
export const rateLimiter = new RateLimiter();
