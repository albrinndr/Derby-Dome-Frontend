import toast from "react-hot-toast";
import Api from "../services/axios";
import clubRoutes from "../services/endpoints/clubEndPoints";
import errorHandle from "./error";

interface ClubFormData {
    email: string,
    password: string;
}

interface ChangeXI {
    p1Id: string,
    p2Id: string;
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

export const clubLogin = async (clubData: ClubFormData) => {
    try {
        const response = await Api.post(clubRoutes.login, clubData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const logoutClub = async () => {
    try {
        const response = await Api.post(clubRoutes.logout);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

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
        toast.success('updated');
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const updateClubBackground = async (bgImg: FormData) => {
    try {
        const response = await Api.put(clubRoutes.updateBackground, bgImg);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getClubTeamData = async () => {
    try {
        const response = await Api.get(clubRoutes.getTeamData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const addClubManager = async (data: FormData) => {
    try {
        const response = await Api.post(clubRoutes.addManager, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const editClubManager = async (data: FormData) => {
    try {
        const response = await Api.put(clubRoutes.editManager, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const addClubPlayer = async (data: FormData) => {
    try {
        const response = await Api.post(clubRoutes.addPlayer, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const editClubPlayer = async (data: FormData) => {
    try {
        const response = await Api.put(clubRoutes.editPlayer, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const deleteClubPlayer = async (id: string) => {
    try {
        const response = await Api.delete(clubRoutes.deletePlayer(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const changeStartingXI = async (data: ChangeXI) => {
    try {
        const response = await Api.put(clubRoutes.changeXI(data.p1Id, data.p2Id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};