// services/authService.ts

type VerifyOtpResponse = {
  success: boolean;
  user?: {
    phone: string;
    name: string;
  };
};

export const authService = {
  // Fake OTP verify function
  verifyOtp: async (
    phone: string,
    otp: string
  ): Promise<VerifyOtpResponse> => {
    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy logic - accept any 6-digit OTP for demo
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      return {
        success: true,
        user: {
          phone,
          name: "KK User",
        },
      };
    }

    return {
      success: false,
    };
  },

  // Optional: send OTP
  sendOtp: async (phone: string): Promise<{ success: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("OTP sent to:", phone);

    return { success: true };
  },
};