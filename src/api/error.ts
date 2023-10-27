import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
interface ErrorResponse {
    message: string;
    // Add other properties based on the structure of your JSON response
}

const errorHandle = (error: Error | AxiosError) => {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        if (errorResponse.message) {
            toast.error(errorResponse.message);
        } else {
            console.log('Error response has no message');
        }
    } else {
        console.log(axiosError.message);
    }
};

export default errorHandle;
