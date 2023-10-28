import toast from "react-hot-toast";
import Api from "../services/axios";
import clubRoutes from "../services/endpoints/clubEndPoints";
import errorHandle from "./error";

interface ClubFormData {
    email: string,
    password: string;
}

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
        const response = await Api.post(clubRoutes.verify, { otp });
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

export const clubLogin = async (clubData: ClubFormData)=>{
    try {
        const response = await Api.post(clubRoutes.login, clubData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const logoutClub = async ()=>{
    try {
        const response = await Api.post(clubRoutes.logout);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const getClubProfile = async () => {
    try {
        const response = await Api.get(clubRoutes.getProfile);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const updateClubProfile = async (clubData: FormData) => {
    try {
        const response = await Api.put(clubRoutes.updateProfile, clubData);
        toast.success('updated')
        console.log(response.data);
        
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};