import React, { useState, useEffect } from "react";
import { blockUser, fetchUsers } from "../../../api/admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import ConfirmationModal from "../../common/ConfirmationModal";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
    createdAt: string,
    isGoogle: boolean;
    profilePic: string;
};

interface ModalState {
    modal: {
        showModal: boolean;
    };
}

const UserTable = () => {
    const [search, setSearch] = useState('');
    const { isLoading, data: usersList, refetch } = useQuery({ queryKey: ['usersList'], queryFn: fetchUsers });
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (usersList) {
            setUsers(usersList.data);
        }
    }, [usersList]);

    const { status, mutate } = useMutation({
        mutationFn: blockUser,
        onSuccess: (res) => {
            if (res && res.data) toast.success('User status changed!');
            refetch();
        },
    });

    const filteredUsers = users.filter(user => {
        const userName = user.name.toLowerCase();
        const searchValue = search.toLowerCase();
        return userName.includes(searchValue);
    });

    const userActionHandler = async (id: string) => {
        mutate(id);
    };

    const [userId, setUserId] = useState('');
    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const modalHandler = (id: string) => {
        setUserId(id);
        dispatch(openModal());
    };


    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastFixture = currentPage * itemsPerPage;
    const indexOfFirstFixture = indexOfLastFixture - itemsPerPage;
    const paginatedUsers = filteredUsers.slice(indexOfFirstFixture, indexOfLastFixture);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const isDisabled = (status as string) === 'loading' || (status as string) === 'pending';

    return (
        <>
            <div className="container mx-auto px-4 lg:px-14">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Users</h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">


                        </div>
                        <div className="block relative">
                            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <input placeholder="Search"
                                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none "
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Mobile
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Date Joined
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                {isLoading ?
                                    <TableSkeleton />
                                    :
                                    <tbody>
                                        {
                                            paginatedUsers.map((user: User, i: number) => (
                                                <tr key={i}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 w-10 h-10">
                                                                <img className="w-full h-full rounded-full"
                                                                    src={user.profilePic}
                                                                    alt="no image" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {user.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div className="flex">
                                                            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                                                            {user.isGoogle && <p className="mt-1 ml-1"><FcGoogle /></p>}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.phone}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {user.createdAt}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {
                                                            user.isBlocked ?
                                                                <span
                                                                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                                                >
                                                                    <span aria-hidden
                                                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                                    <button className="relative" onClick={() => modalHandler(user._id)}
                                                                        disabled={isDisabled}>Blocked</button>
                                                                </span>
                                                                :
                                                                <span
                                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                                >
                                                                    <span aria-hidden
                                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                    <button className="relative" onClick={() => modalHandler(user._id)}
                                                                        disabled={isDisabled}>Active</button>
                                                                </span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {!paginatedUsers.length && <tr className="flex justify-center ">
                                            <td className="px-5 py-5 text-center border-b border-gray-200  text-sm w-">
                                                <div className="flex items-center">

                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            No users found
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>}
                                    </tbody>}

                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                                <div className="inline-flex mt-2 xs:mt-0">
                                    <TablePagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={filteredUsers.length}
                                        paginate={paginate}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && <ConfirmationModal confirmFn={userActionHandler} id={userId} />}
            </div>
            {status === 'pending' && <Loader />}
        </>
    );
};

export default UserTable;
