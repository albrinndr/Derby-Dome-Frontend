import  { useState } from "react";
import toast from "react-hot-toast";
import { updateClubBackground } from "../../../api/club";
import { useDispatch, useSelector } from "react-redux";
import { setClubLogin } from "../../../store/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import Loader from "../../common/Loader";

interface Background {
    auth: {
        cLoggedIn: {
            bgImg: string;
        };
    };
}

const Background = () => {
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useDispatch();
    const { cLoggedIn } = useSelector((state: Background) => state.auth);

    const { status, mutate } = useMutation({
        mutationFn: updateClubBackground,
        onSuccess: (updated) => {
            if (updated) {
                const updatedData = {
                    ...cLoggedIn,
                    bgImg: updated.data.bgImg
                };
                dispatch(setClubLogin(updatedData));
            }
        }
    });


    const updateBackgroundHandler = async () => {
        if (!image) {
            toast.error('Select an image');
            return;
        }

        const banner = new FormData();
        banner.append('image', image);

        mutate(banner);
        setImage(null);
    };


    return (
        <div className="mt-6 md:p-14 p-4">
            <div className="flex flex-col justify-center items-center">
                <div className="w-1/2 mb-4" >
                    {image && <img src={URL.createObjectURL(image)} alt="" />}
                </div>
                <label className="cursor-pointer bg-gray-400 hover:bg-gray-500 w-fit max-w-md  text-white font-semibold py-2 px-4 rounded-lg">
                    {image ? image.name : 'Change background'}
                    <input
                        className="hidden"
                        type="file"
                        name='file'
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </label>
                {image && <div className="mt-4">
                    <button onClick={updateBackgroundHandler} className="p-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold">Update background</button>
                </div>}
            </div>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default Background;
