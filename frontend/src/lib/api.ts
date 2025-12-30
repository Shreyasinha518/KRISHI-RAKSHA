// API utility for backend communication
// Use Next.js API routes as proxy to avoid CORS issues
// The proxy routes at /api/auth/* will forward to the actual backend
const API_URL = ''; // Empty string means use relative URLs (Next.js API routes as proxy)

// Helper function to format phone number to +91XXXXXXXXXX
function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If it's already 10 digits, add +91 prefix
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  
  // If it already starts with +91, return as is
  if (phone.startsWith('+91')) {
    return phone.replace(/\D/g, '').replace(/^91/, '+91');
  }
  
  // If it's 12 digits starting with 91, add + prefix
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  
  // Otherwise, assume it's a 10-digit number and add +91
  return `+91${digits.slice(-10)}`;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // If baseUrl is empty, use Next.js API routes as proxy (relative URLs)
    // Otherwise, use the backend URL directly
    const url = this.baseUrl 
      ? `${this.baseUrl}${endpoint}` 
      : endpoint; // endpoint already includes /api/auth/...
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async sendPhoneOTP(phone: string) {
    const formattedPhone = formatPhoneNumber(phone);
    return this.request<{ success: boolean; message: string }>(
      '/api/auth/send-phone-otp',
      {
        method: 'POST',
        body: JSON.stringify({ phone: formattedPhone }),
      }
    );
  }

  async verifyPhoneOTP(phone: string, otp: string) {
    const formattedPhone = formatPhoneNumber(phone);
    return this.request<{ success: boolean; message: string }>(
      '/api/auth/verify-phone-otp',
      {
        method: 'POST',
        body: JSON.stringify({ phone: formattedPhone, otp }),
      }
    );
  }

  async sendEmailOTP(email: string) {
    return this.request<{ success: boolean; message: string }>(
      '/api/auth/send-email-otp',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
      }
    );
  }

  async verifyEmailOTP(email: string, otp: string) {
    return this.request<{ success: boolean; message: string }>(
      '/api/auth/verify-email-otp',
      {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      }
    );
  }

  async register(data: {
    phone: string;
    email: string;
    password: string;
    name: string;
    village?: string;
    district?: string;
    state: string;
    landSizeAcres: number;
    cropType: string;
    upiId?: string;
    bankAccountNumber?: string;
    bankIfscCode?: string;
    bankName?: string;
  }) {
    const formattedPhone = formatPhoneNumber(data.phone);
    return this.request<{
      success: boolean;
      message: string;
      farmer: {
        id: string;
        name: string;
        phone: string;
        email: string;
      };
      token: string;
    }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...data, phone: formattedPhone }),
    });
  }

  async login(phone: string, password: string) {
    const formattedPhone = formatPhoneNumber(phone);
    return this.request<{
      success: boolean;
      message: string;
      farmer: {
        id: string;
        name: string;
        phone: string;
        email: string;
        metamaskAddress?: string;
      };
      token: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone: formattedPhone, password }),
    });
  }

  async getCurrentFarmer() {
    return this.request<{
      success: boolean;
      farmer: {
        id: string;
        name: string;
        phone: string;
        email: string;
        village?: string;
        district?: string;
        state?: string;
        landSizeAcres?: number;
        cropType?: string;
        upiId?: string;
        bankAccountNumber?: string;
        metamaskAddress?: string;
        isPhoneVerified: boolean;
        isEmailVerified: boolean;
      };
    }>('/api/auth/me', {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient(API_URL);

