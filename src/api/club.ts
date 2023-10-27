import Api from "../services/axios";
import clubRoutes from "../services/endpoints/clubEndPoints";
import errorHandle from "./error";

interface FormData {
    name: string,
    email: string,
    phone: string,
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