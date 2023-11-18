import stadiumRoutes from "../services/endpoints/stadiumEndPoints";
import toast from "react-hot-toast";
import errorHandle from "./error";
import Api from "../services/axios";

interface MatchTime {
    time?: string,
    price: number;
    id?: string;
}

interface Seat {
    stand: string;
    seatName: string;
    price: string;
}

export const getBanners = async () => {
    try {
        const response = await Api.get(stadiumRoutes.banners);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const updateBanner = async (bannerData: FormData) => {
    try {
        const response = await Api.put(stadiumRoutes.banners, bannerData);
        toast.success('Banner updated!');
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const addMatchTime = async (data: MatchTime) => {
    try {
        const response = await Api.post(stadiumRoutes.matchTime, data);
        toast.success('Time added!');
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getAllTimes = async () => {
    try {
        const response = await Api.get(stadiumRoutes.getAllTimes);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};


export const updateMatchTimePrice = async (data: MatchTime) => {
    try {
        const response = await Api.put(stadiumRoutes.updateMatchTimePrice, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const deleteMatchTime = async (id: string) => {
    try {
        const response = await Api.put(stadiumRoutes.deleteMatchTimes(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getAllSeatPrice = async () => {
    try {
        const response = await Api.get(stadiumRoutes.getSeatPrice);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const setSeatPrice = async (data: Seat) => {
    try {
        const response = await Api.post(stadiumRoutes.setSeatPrice, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};