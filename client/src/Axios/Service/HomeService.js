import { axiosHomeInstance, axiosClientInstance } from "../axios";
export const clientRegister = async (value) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosHomeInstance.post(
      "/userRegister",
      value,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const clientLogin = async (value) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosClientInstance.post("/login", value, config);
    return data;
  } catch (error) {
    return error;
  }
};
export const SendOtp = async (value) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosHomeInstance.post(
      "/forgotpassword",
      value,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const ChangePassword = async (value) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosHomeInstance.post(
      "/changePassword",
      value,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};
