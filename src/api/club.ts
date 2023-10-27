import Api from "../services/axios";
import clubRoutes from "../services/endpoints/clubEndPoints";
import errorHandle from "./error";



export const clubSignUp = async (clubData:FormData) => {
    try {
        console.log(clubData);

        const response = await Api.post(clubRoutes.signUp, clubData);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }

};