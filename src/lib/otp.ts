import api from "./axios";

// Send OTP
export async function sendOtp(phone:number | string) {
  try {
    const res = await api.post("/otp/send", { phone });
    return res.data;
  } catch (error:any) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
}

 