import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { getBanners, updateBanner } from "../../../api/admin";

const Banner = () => {
    const { status, data: banners } = useQuery({ queryKey: ['adminBanners'], queryFn: getBanners });

    const [formData, setFormData] = useState({
        name: 'banner1',
        text: '',
        image: '',
        color: ''
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (status != 'pending' && banners?.data) {
            setFormData({
                name: 'banner1',
                text: banners.data[0].text,
                image: banners.data[0].image,
                color: banners.data[0].color,
            });
        }
    }, [status, banners]);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateBanner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminBanners'] });
        },
    });


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bannerData = new FormData();
        bannerData.append("name", formData.name);
        bannerData.append("text", formData.text);
        bannerData.append("color", formData.color);
        if (image) bannerData.append("image", image);
        mutate(bannerData);
        setImage(null)
    };

    const isDisabled = (status as string) === 'loading' || (status as string) === 'pending';

    return (
        <div className="p-4">
            {!isDisabled && <form onSubmit={submitHandler}>
                <img src={formData.image} className="mb-5 rounded w-1/2" alt="" />
                <div>
                    <input type="text" name="name" id="" value={formData.name} onChange={inputHandler} hidden />
                    <input
                        className="hidden"
                        id="image"
                        type="file"
                        name='file'
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                    <label
                        htmlFor="image"
                        className="w-1/2 flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        <span className='text-gray-500 text-sm'>{image ? image.name : 'Upload banner'}</span>
                    </label>
                </div>
                <div className="mt-4 ">
                    <div className="flex">
                        <span className="text-sm text-gray-500 mt-1"> <AiOutlineQuestionCircle /> </span>
                        <span className="text-sm text-gray-500 ml-1">Optional</span>
                    </div>
                    <input type="text" name="" id="text" placeholder="Enter you banner text" className="border border-gray-400 rounded " value={formData.text} onChange={inputHandler} />

                </div>
                <div>
                    <button className="bg-green-400 mt-5 hover:bg-green-500 rounded p-2 w-1/4" type="submit">Save</button>
                </div>
            </form>}
        </div>
    );
};

export default Banner;
