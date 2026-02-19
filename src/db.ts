export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  referralCode?: string | undefined;
  isVerified: boolean;
  otp?: string | undefined; // in milliseconds
  otpExpiry?: number | undefined;
}

export const users: User[] = []