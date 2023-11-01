// import toast from "react-hot-toast";
import Api from "../services/axios";
import errorHandle from "./error";
import adminRoutes from "../services/endpoints/adminEndPoints";
import toast from "react-hot-toast";

interface LoginData {
    email: string,
    password: string;
}

export const adminLogin = async (adminData: LoginData) => {
    try {
        const response = await Api.post(adminRoutes.login, adminData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const logoutAdmin = async () => {
    try {
        const response = await Api.post(adminRoutes.logout);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const fetchUsers = async () => {
    try {
        const response = await Api.get(adminRoutes.fetchUsers);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const blockUser = async (id: string) => {
    try {
        const response = await Api.put(adminRoutes.blockUsers(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const fetchClubs = async () => {
    try {
        const response = await Api.get(adminRoutes.fetchClubs);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const blockClub = async (id: string) => {
    try {
        const response = await Api.put(adminRoutes.blockClubs(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getBanners = async () => {
    try {
        const response = await Api.get(adminRoutes.banners);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const updateBanner = async (bannerData: FormData) => {
    try {
        const response = await Api.put(adminRoutes.banners, bannerData);
        toast.success('Banner updated!')
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};