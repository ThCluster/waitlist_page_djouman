export interface WaitlistSubmission {
  email: string;
  timestamp: string;
  position: number;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  count?: number;
  position?: number;
}
