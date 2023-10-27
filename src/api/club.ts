import Api from "../services/axios";
import clubRoutes from "../services/endpoints/clubEndPoints";
import errorHandle from "./error";

export const clubSignUp = async (clubData: FormData) => {
    try {
        const response = await Api.post(clubRoutes.signUp, clubData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const clubOtpVerify = async (otp: number) => {
    try {
        const response = await Api.post(clubRoutes.verify, {otp});
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const clubResendOtp = async () => {
    try {
        const response = await Api.post(clubRoutes.resendOtp);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};