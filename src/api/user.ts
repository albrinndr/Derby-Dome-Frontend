import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";

interface FormData {
    name: string,
    email: string,
    phone: string,
    password: string;
}

export const signUp = async (userData: FormData) => {
    try {
        const response = await Api.post(userRoutes.signUp, userData);
        return response;
    } catch (error) {
        console.log(error);
    }
};