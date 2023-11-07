import React, { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GrClose } from 'react-icons/gr';
import { editClubManager } from "../../../api/club";
import toast from "react-hot-toast";

interface Modal {
    modalFn: () => void;
    refetch: () => void;
    loadingFn: (val: boolean) => void;
    managerName: string;
}

const EditManager: React.FC<Modal> = ({ modalFn, refetch, loadingFn, managerName }) => {
    const [name, setName] = useState<string>(managerName);
    const [image, setImage] = useState<File | null>(null);

    const { mutate: editManager } = useMutation({
        mutationFn: editClubManager,
        onSuccess: () => {
            toast.success('Manager data updated!');
            loadingFn(false);
            refetch();
        }
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim().length < 3) {
            toast.error('Add a proper name');
            return;
        } else {
            const managerFormData = new FormData();
            managerFormData.append('name', name);
            if (image) managerFormData.append('image', image);
            editManager(managerFormData);
            loadingFn(true);
            modalFn();
        }
    };

    return (
        <>
            <div className="bg-black opacity-50 fixed z-0 top-0 left-0 right-0 bottom-0 "
            ></div>
            <div className="fixed  top-0 left-0 right-0 bottom-0 grid place-content-center z-10 ">
                <div className="bg-white rounded text-black ">
                    <div className="text-gray-700 flex justify-end mt-2 mr-4">
                        <div className="cursor-pointer" onClick={modalFn}>
                            <GrClose />
                        </div>
                    </div>
                    <div className="p-5 ">
                        <form onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="">Manager Name:</label>
                                <br /><input type="text"
                                    className="border pl-2 h-10 w-64 mt-2 focus:outline-slate-300"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mt-6">
                                {image && <img src={URL.createObjectURL(image)} className="w-20 rounded-full" alt="" />}
                            </div>
                            <div className="mt-3">
                                <label className="bg-gray-400 px-2 py-1 rounded text-white">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name='file'
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                    />{image ? image.name.substring(0, 17) + (image.name.length > 17 ? "..." : "") : 'image upload'}
                                </label>
                            </div>
                            <div className="mt-6">
                                <button className="bg-green-500 text-white px-2 py-1 w-full rounded-sm">Update</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default EditManager;
