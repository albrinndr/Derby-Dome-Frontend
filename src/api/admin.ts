// import toast from "react-hot-toast";
import Api from "../services/axios";
import errorHandle from "./error";
import adminRoutes from "../services/endpoints/adminEndPoints";
import { QueryFunctionContext } from "@tanstack/react-query";

interface LoginData {
    email: string,
    password: string;
}

interface Coupon {
    id?: string;
    name: string,
    desc: string;
    minPrice: string;
    discount: string;
    startingDate: string;
    endingDate: string;
    users?: string[];
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

export const addCoupon = async (data: Coupon) => {
    try {
        const response = await Api.post(adminRoutes.addCoupon, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getCoupons = async () => {
    try {
        const response = await Api.get(adminRoutes.getCoupons);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const editCoupon = async (data: Coupon) => {
    try {
        const response = await Api.put(adminRoutes.editCoupon, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const deleteCoupon = async (id: string) => {
    try {
        const response = await Api.delete(adminRoutes.deleteCoupon(id));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const dashboardSales = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, year] = queryKey;
        const response = await Api.get(`${adminRoutes.dashboardSales}?year=${year}`);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const dashboardChartAndStaticContent = async () => {
    try {
        const response = await Api.get(adminRoutes.dashboardStaticContent);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};


export const dashboardTicketSales = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, year] = queryKey;
        const response = await Api.get(`${adminRoutes.dashboardTicketContent}?year=${year}`);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const allClubFixtures = async () => {
    try {
        const response = await Api.get(adminRoutes.allFixtures);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};