import React, { useState } from "react";
import { IoMdSwap } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import AddPlayer from "./AddPlayer";
import AddManager from "./AddManager";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../common/LoadingScreen";
import { deleteClubPlayer, getClubTeamData } from "../../../api/club";
import EditManager from "./EditManager";
import './PlayerTable.module.css';
import EditPlayer from "./EditPlayer";
import { useDispatch, useSelector } from "react-redux";
import { openModal as deleteModal } from "../../../store/slices/modalSlice";
import toast from "react-hot-toast";
import ConfirmationModal from "../../common/ConfirmationModal";


interface Manager {
    name: string;
    image: string;
}

interface Player {
    _id: string;
    name: string,
    shirtNo: number;
    position: string;
    image: string;
    startingXI: boolean;
}

interface ModalState {
    modal: {
        showModal: boolean;
    };
}

const PlayerTable = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [editManagerModal, setEditManagerModal] = useState<boolean>(false);
    const [selectedCheckbox, setSelectedCheckbox] = useState<string>('');
    const [selectedCheckbox1, setSelectedCheckbox1] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const [pName, setPName] = useState('');
    const [pShirtNo, setPShirtNo] = useState('');
    const [pPosition, setPPosition] = useState('');
    const [pId, setPId] = useState('');
    const [editPlayerModal, setEditPlayerModal] = useState(false);

    const { isLoading, data: clubData, refetch } = useQuery({ queryKey: ['teamData'], queryFn: getClubTeamData });

    const manager: Manager = clubData?.data.manager;
    const players = clubData?.data.players;
    const starting = players ? players.filter((player: Player) => player.startingXI) : [];
    const nonStarting = players ? players.filter((player: Player) => !player.startingXI) : [];


    const modalHandler = () => {
        setOpenModal(!openModal);
    };

    const managerEditModalHandler = () => {
        setEditManagerModal(!editManagerModal);
    };

    const playerEditModalHandler = () => {
        setEditPlayerModal(!editPlayerModal);
    };

    const setEditPlayerData = (name: string, shirtNo: string, position: string, id: string) => {
        setPName(name);
        setPShirtNo(shirtNo);
        setPPosition(position);
        setPId(id);
        playerEditModalHandler();
    };

    const handleCheckboxChange = (index: string) => {
        if (selectedCheckbox === index) {
            setSelectedCheckbox('');
        } else {
            setSelectedCheckbox(index);
        }
    };

    const handleCheckboxChange1 = (index: string) => {
        if (selectedCheckbox1 === index) {
            setSelectedCheckbox1('');
        } else {
            setSelectedCheckbox1(index);
        }
    };

    const loadingHandler = (val: boolean) => {
        setShowLoading(val);
    };

    const { mutate: deletePlayerMutate } = useMutation({
        mutationFn: deleteClubPlayer,
        onSuccess: (res) => {
            if (res) toast.success('Player removed');
            refetch();
            loadingHandler(false);
        }
    });


    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const deleteModalHandler = (id: string) => {
        setPId(id);
        dispatch(deleteModal());
        loadingHandler(true);
    };


    return (
        <>
            {showLoading && <LoadingScreen size={34} />}
            <>{isLoading
                ?
                <LoadingScreen size={34} />
                :
                <>
                    {openModal && !manager.name && <AddManager modalFn={modalHandler} loadingFn={loadingHandler} refetch={refetch} />}
                    {openModal && manager.name && <AddPlayer modalFn={modalHandler} refetch={refetch} loadingFn={loadingHandler} />}

                    {editManagerModal && <EditManager
                        refetch={refetch}
                        loadingFn={loadingHandler}
                        modalFn={managerEditModalHandler}
                        managerName={manager.name}
                    />}

                    {editPlayerModal && <EditPlayer
                        modalFn={playerEditModalHandler}
                        loadingFn={loadingHandler}
                        refetch={refetch}
                        pId={pId}
                        pName={pName}
                        pPosition={pPosition}
                        pShirtNo={pShirtNo}
                    />}


                    <div className="flex justify-between items-center gap-5">
                        <button className="p-2 bg-red-600 rounded text-white text-sm sm:text-md" onClick={modalHandler}>
                            {!manager.name ? 'ADD MANAGER' : 'ADD PLAYER'}
                        </button>
                        {manager.name && <div className="flex items-center border px-2 py-1 rounded gap-3 cursor-pointer" onClick={managerEditModalHandler}>
                            <div className="">
                                <img className="rounded-full w-4 sm:w-8" src={manager.image} alt="" />
                            </div>
                            <div className="">
                                <div>
                                    {manager.name}
                                </div>
                                <span className="text-xs text-gray-500">Manager</span>

                            </div>
                        </div>}
                    </div>
                    {selectedCheckbox && selectedCheckbox1 && <div className="flex justify-center">
                        <button className="px-4 py-2 rounded bg-green-500 text-white font-semibold flex items-center mt-4 lg:mt-0 sm:gap-2 sm:text-md w-48 justify-center"><IoMdSwap /> SWAP</button>
                    </div>}

                    <div className="py-8 xl:flex justify-between ">
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto  text-center">
                            <h1 className="font-semibold mb-3">PLAYERS</h1>
                            <div className="inline-block max-h-72   rounded-lg ">
                                <table className="bg-white shadow">
                                    <thead>
                                        <tr className="">
                                            <th
                                                className="px-3 py-3 border-b-2 pl-16 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                IMG
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                PLAYER
                                            </th>

                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                POS
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nonStarting.length
                                            ?
                                            <>
                                                {nonStarting.map((player: Player) => (
                                                    <tr className="bg-white  border-b" key={player._id}>
                                                        <td className="px-3 py-3   text-sm w-32">
                                                            <div className="flex items-center gap-4">
                                                                <div className="ml-3">
                                                                    <input type="checkbox"
                                                                        checked={selectedCheckbox === player._id}
                                                                        onChange={() => handleCheckboxChange(player._id)}
                                                                    />
                                                                </div>
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-full h-full rounded-full"
                                                                        src={player.image}
                                                                        alt="" />
                                                                </div>

                                                            </div>
                                                        </td>

                                                        <td className=" w-32 px-3  py-3  text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{player.shirtNo}</p>
                                                        </td>

                                                        <td className=" w-32 px-3  py-3   text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap"
                                                                style={{ maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                            >{player.name}</p>
                                                        </td>

                                                        <td className=" w-28 px-3  py-3  text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {player.position}
                                                            </p>
                                                        </td>

                                                        <td className=" w-28 px-3  py-3 gap-10 border-gray-200 text-xl flex items-center">
                                                            <div className=" text-green-500 cursor-pointer mt-3"
                                                                onClick={() => setEditPlayerData(player.name, player.shirtNo + "", player.position, player._id)}
                                                            >
                                                                <AiOutlineEdit />
                                                            </div>
                                                            <div className=" text-red-500 cursor-pointer mt-3 "
                                                                onClick={() => deleteModalHandler(player._id)}
                                                            >
                                                                <MdDelete />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                            :
                                            <tr className="bg-white  border-b">
                                                <td className=" w-fit px-32 sm:px-48  py-3  text-sm" colSpan={5}>
                                                    <p className="text-gray-900">
                                                        No player data available
                                                    </p>
                                                </td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto text-center mt-7 xl:mt-0">
                            <h1 className="font-semibold mb-3">POSSIBLE STARTING XI</h1>
                            <div className="inline-block rounded-lg max-h-72 ">
                                <table className="shadow bg-white ">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-3 py-3 border-b-2 pl-16 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                IMG
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                #
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                PLAYER
                                            </th>

                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                POS
                                            </th>
                                            <th
                                                className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {starting.length
                                            ?
                                            <>
                                                {starting.map((player: Player) => (
                                                    <tr className=" border-b" key={player._id}>
                                                        <td className="px-3 py-3   text-sm w-32">
                                                            <div className="flex items-center gap-4">
                                                                <div className="ml-3">
                                                                    <input type="checkbox" name="" id=""
                                                                        checked={selectedCheckbox1 === player._id}
                                                                        onChange={() => handleCheckboxChange1(player._id)}
                                                                    />
                                                                </div>
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-full h-full rounded-full"
                                                                        src={player.image}
                                                                        alt="" />
                                                                </div>

                                                            </div>
                                                        </td>

                                                        <td className=" w-32 px-3  py-3  text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{player.shirtNo}</p>
                                                        </td>

                                                        <td className=" w-32 px-3  py-3   text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap"
                                                                style={{ maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                            >{player.name}</p>
                                                        </td>

                                                        <td className=" w-28 px-3  py-3  text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {player.position}
                                                            </p>
                                                        </td>


                                                    </tr>
                                                ))}
                                            </>
                                            :

                                            <tr className="bg-white  border-b">
                                                <td className=" w-fit px-32 sm:px-48  py-3  text-sm" colSpan={5}>
                                                    <p className="text-gray-900">
                                                        No player data available
                                                    </p>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }

            </>
            {showModal && <ConfirmationModal confirmFn={deletePlayerMutate} id={pId} />}
        </>

    );
};

export default PlayerTable;
