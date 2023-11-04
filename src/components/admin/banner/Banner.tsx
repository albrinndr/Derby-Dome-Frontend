import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { getBanners, updateBanner } from "../../../api/stadium";

const Banner = () => {
    const { status, data: banners } = useQuery({ queryKey: ['adminBanners'], queryFn: getBanners });

    const [formData, setFormData] = useState({
        name: 'banner1',
        text: '',
        image: '',
    });
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (status != 'pending' && banners?.data[0]) {
            setFormData({
                name: 'banner1',
                text: banners.data[0].text,
                image: banners.data[0].image,
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
        if (image) bannerData.append("image", image);
        mutate(bannerData);
        setImage(null);
    };

    const isDisabled = (status as string) === 'loading' || (status as string) === 'pending';

    //second banner

    const [formData1, setFormData1] = useState({
        name1: 'banner2',
        text1: '',
        image1: '',
    });
    const [image1, setImage1] = useState<File | null>(null);

    useEffect(() => {
        if (status != 'pending' && banners?.data[1]) {
            setFormData1({
                name1: 'banner2',
                text1: banners.data[1].text,
                image1: banners.data[1].image,
            });
        }
    }, [status, banners]);

    const inputHandler1 = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData1({ ...formData1, [e.target.id]: e.target.value });
    };

    const submitHandler1 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bannerData = new FormData();
        bannerData.append("name", formData1.name1);
        bannerData.append("text", formData1.text1);
        if (image1) bannerData.append("image", image1);
        mutate(bannerData);
        setImage1(null);
        console.log(bannerData);
    }; 1;

    return (
        <div className="p-4 md:p-14">
            {!isDisabled &&
                <>
                    <div className="lg:flex lg:gap-10">
                        <div>
                            <form onSubmit={submitHandler}>
                                <div className="">
                                    <img src={formData.image} className="mb-5 rounded w-full h-96" alt="" />
                                </div>                                <div>
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
                                    <button className="bg-green-400 mt-5 hover:bg-green-500 rounded p-2 sm:w-10 md:w-28" type="submit">
                                        Save
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>


                    <div className="mt-10">
                        <form onSubmit={submitHandler1}>
                            <img src={formData1.image1} className="mb-5 rounded  h-96" alt="" />
                            <div>
                                <input type="text" name="name" id="" value={formData1.name1} onChange={inputHandler1} hidden />
                                <input
                                    className="hidden"
                                    id="image1"
                                    type="file"
                                    name='file'
                                    accept="image/*"
                                    onChange={(e) => setImage1(e.target.files?.[0] || null)}
                                />
                                <label
                                    htmlFor="image1"
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
                                    <span className='text-gray-500 text-sm'>{image1 ? image1.name : 'Upload banner'}</span>
                                </label>
                            </div>
                            <div className="mt-4 ">
                                <div className="flex">
                                    <span className="text-sm text-gray-500 mt-1"> <AiOutlineQuestionCircle /> </span>
                                    <span className="text-sm text-gray-500 ml-1">Optional</span>
                                </div>
                                <input type="text" name="" id="text1" placeholder="Enter you banner text" className="border border-gray-400 rounded " value={formData1.text1} onChange={inputHandler1} />

                            </div>
                            <div>
                                <button className="bg-green-400 mt-5 hover:bg-green-500 rounded p-2 sm:w-10 md:w-28" type="submit">
                                    Save
                                </button>

                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default Banner;
