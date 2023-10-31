import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandle from "./error";

interface userFormData {
    name?: string,
    email: string,
    phone?: string,
    password?: string;
    newPassword?: string;
    isGoogle?: boolean;
}

export const signUp = async (userData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.signUp, userData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const otpVerify = async (otp: number) => {
    try {
        const response = await Api.post(userRoutes.verify, { otp });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const resendOtp = async () => {
    try {
        const response = await Api.post(userRoutes.resendOtp);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const login = async (loginData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.login, loginData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const logout = async () => {
    try {
        const response = await Api.post(userRoutes.logout);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getUserProfile = async () => {
    try {
        const response = await Api.get(userRoutes.getProfile);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const updateUserProfile = async (userData: FormData) => {
    try {
        const response = await Api.put(userRoutes.updateProfile, userData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getBanner = async () => {
    try {
        const response = await Api.get(userRoutes.banners);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};