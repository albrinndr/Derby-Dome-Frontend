import { QueryFunctionContext } from "@tanstack/react-query";
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

interface BookingData {
    fixtureId: string;
    stand: string;
    section: string;
    ticketCount: number;
    type: string;
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


export const getHome = async () => {
    try {
        const response = await Api.get(userRoutes.getHome);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getFixtures = async () => {
    try {
        const response = await Api.get(userRoutes.getFixtures);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const userSearch = async () => {
    try {
        const response = await Api.get(userRoutes.search);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const fixtureDetails = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, fixtureId] = queryKey;
        const response = await Api.get(`${userRoutes.fixtureDetails}?id=${fixtureId}`);
        console.log(response.data);

        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const clubDetails = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, fixtureId] = queryKey;
        const response = await Api.get(`${userRoutes.clubDetails}?id=${fixtureId}`);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getBooking = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, fixtureId] = queryKey;
        const response = await Api.get(`${userRoutes.booking}?id=${fixtureId}`);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const addToCart = async (data: BookingData) => {
    try {
        const response = await Api.post(userRoutes.addToCart, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const getCheckoutData = async () => {
    try {
        const response = await Api.get(userRoutes.getCheckout);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};