import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import errorHandle from "./error";

interface FormData {
    name?: string,
    email: string,
    phone?: string,
    password: string;
}

export const signUp = async (userData: FormData) => {
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

export const login = async (loginData: FormData) => {
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