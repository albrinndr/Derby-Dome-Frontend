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

interface Ticket {
    fixtureId: string;
    stand: string;
    section: string;
    ticketCount: number;
    seats: [{
        row: string;
        userSeats: number[];
    }];
    price: number;
    paymentType: string;
    coupon: {
        isApplied: boolean | string;
        isLoyalty: boolean;
    };
}


interface ApplyCoupon {
    coupon: string;
    price: number;
}

interface Review {
    rating: number;
    review: string;
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
        const [_, fixtureId] = queryKey;

        const response = await Api.get(`${userRoutes.fixtureDetails}?id=${fixtureId}`);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const clubDetails = async ({ queryKey }: QueryFunctionContext<[string, string | null]>) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, fixtureId] = queryKey;
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
        const [_, fixtureId] = queryKey;

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

export const addNewTicket = async (ticketData: Ticket) => {
    try {
        const response = await Api.post(userRoutes.addTicket, ticketData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const getTickets = async () => {
    try {
        const response = await Api.get(userRoutes.getTickets);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const cancelTicket = async (ticketId: string) => {
    try {
        const response = await Api.put(userRoutes.cancelTicket, { ticketId });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const validateCoupon = async (data: ApplyCoupon) => {
    try {
        const response = await Api.post(userRoutes.validateCoupon, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};
export const addUpdateReview = async (data: Review) => {
    try {
        const response = await Api.post(userRoutes.review, data);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const deleteReview = async () => {
    try {
        const response = await Api.delete(userRoutes.review);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const allReviews = async () => {
    try {
        const response = await Api.get(userRoutes.review);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const userReview = async () => {
    try {
        const response = await Api.get(userRoutes.userReview);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};

export const followClub = async (clubId: string) => {
    try {
        const response = await Api.post(userRoutes.followClub(clubId));
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getNotifications = async () => {
    try {
        const response = await Api.get(userRoutes.notifications);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};
export const notificationCount = async () => {
    try {
        const response = await Api.get(userRoutes.notificationCount);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};
export const readNotification = async () => {
    try {
        const response = await Api.put(userRoutes.readNotification);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const userForgotPassword = async (email: string) => {
    try {
        const response = await Api.post(userRoutes.forgotPassword, { email });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};


export const userForgotOtpVerify = async (otp: string) => {
    try {
        const response = await Api.post(userRoutes.forgotOtpValidate, { otp });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const userForgotPasswordChange = async (password: string) => {
    try {
        const response = await Api.put(userRoutes.forgotPasswordChange, { password });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const allFollowedClubs = async () => {
    try {
        const response = await Api.get(userRoutes.allFollowedClubs);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const setClientBrowserToken = async (token: string) => {
    try {
        const response = await Api.post(userRoutes.setClientBrowserToken, { token });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

//loyalty offer

export const allLoyaltyOffers = async () => {
    try {
        const response = await Api.get(userRoutes.allLoyaltyOffers);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const createUserCoupon = async (id: string) => {
    try {
        const response = await Api.post(userRoutes.createUserCoupon, { id });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const userRedeem = async () => {
    try {
        const response = await Api.get(userRoutes.userRedeem);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};