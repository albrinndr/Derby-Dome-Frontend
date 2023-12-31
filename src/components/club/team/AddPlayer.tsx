import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { GrClose } from 'react-icons/gr';
import { addClubPlayer } from "../../../api/club";
import toast from "react-hot-toast";

interface Modal {
    modalFn: () => void;
    refetch: () => void;
    loadingFn: (val: boolean) => void;
}


const AddPlayer: React.FC<Modal> = ({ modalFn, refetch, loadingFn }) => {
    const [name, setName] = useState<string>('');
    const [shirtNo, setShirtNo] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    const { mutate: addPlayerMutate } = useMutation({
        mutationFn: addClubPlayer,
        onSuccess: (res) => {
            if (res) toast.success('Player added!');
            loadingFn(false);
            refetch();
        }
    });

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim().length < 1) {
            toast.error('Enter player name');
            return;
        } else if (shirtNo.trim().length < 1) {
            toast.error('Enter player shirtNo.');
            return;
        } else if (position.trim().length < 1) {
            toast.error('Select player position');
            return;
        } else if (!image) {
            toast.error('Select an image');
            return;
        } else {
            const playerForm = new FormData();
            playerForm.append('name', name);
            playerForm.append('shirtNo', shirtNo);
            playerForm.append('position', position);
            playerForm.append('image', image);
            addPlayerMutate(playerForm);
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
                                <label htmlFor="">Player Name:</label>
                                <br /><input type="text" className="border h-10 w-64 mt-2"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="">Shirt No:</label>
                                <br /><input type="number" min={1} className="border h-10 w-64 mt-2"
                                    value={shirtNo}
                                    onChange={(e) => setShirtNo(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="">Player Pos:</label>
                                <br />
                                <select className="border h-10 w-48 mt-2"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                >
                                    <option value="" className="">---select position---</option>
                                    <option value="FW" className="">FW</option>
                                    <option value="MD" className="">MD</option>
                                    <option value="DF" className="">DF</option>
                                    <option value="GK" className="">GK</option>
                                </select>
                            </div>
                            <div className="mt-6">
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
                                <button className="bg-green-500 text-white px-2 py-1 w-full rounded-sm"
                                    type="submit"
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AddPlayer;
