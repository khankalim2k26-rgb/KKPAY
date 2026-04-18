// store/authStore.ts
import { create } from 'zustand';
import { authService } from '@/services/authService';

type AuthState = {
  isAuthenticated: boolean;
  user: { phone?: string; name?: string } | null;
  isLoading: boolean;

  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  completeLogin: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  verifyOtp: async (phone, otp) => {
    try {
      console.log('Verifying OTP:', { phone, otp });
      const response = await authService.verifyOtp(phone, otp);

      if (response.success) {
        console.log('OTP verified, user:', response.user);
        set({ user: response.user });
        return true;
      }

      console.log('OTP verification failed');
      return false;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  },

  completeLogin: () => {
    console.log('completeLogin called - setting isAuthenticated to true');
    set({ isAuthenticated: true });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  checkAuth: async () => {
    console.log('checkAuth called');
    await new Promise((r) => setTimeout(r, 500));
    set({ isLoading: false });
  },
}));