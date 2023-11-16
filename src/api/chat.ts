import Api from "../services/axios";
import chatRoutes from "../services/endpoints/chatEndPoints";
import errorHandle from "./error";

export const sendMessage = async (text: string) => {
    try {
        const response = await Api.post(chatRoutes.sendMessage, { text });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};

export const getMessages = async () => {
    try {
        const response = await Api.get(chatRoutes.getMessages);
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};