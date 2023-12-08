import { useQuery } from "@tanstack/react-query";
import React, { CSSProperties, useEffect } from "react";
import { getNotifications, readNotification } from "../../../api/user";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NotificationSkeleton from "./NotificationSkeleton";

interface NotificationI {
    closeFn: () => void;
    color?: boolean;
    open: boolean;
    refetchFn: () => void;
}

interface SingleNotification {
    clubName: string;
    clubImage: string;
    notification: {
        date: string;
        fixtureId: string;
        isRead: string[];
        message: string;
    };
    userId: string;
}

const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const Notification: React.FC<NotificationI> = ({ closeFn, color, open, refetchFn }) => {
    const { isLoading, data: notificationData } = useQuery({ queryKey: ['notifications'], queryFn: getNotifications });

    const closeBtnStyle = color ? 'bg-white' : 'bg-gray-200';

    const sidebarStyles: CSSProperties = {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
    };


    //notification read and count
    const updateNotificationRead = async () => {
        const res = await readNotification();
        if (res) {
            console.log(res);

            refetchFn();
        }
    };
    useEffect(() => {
        updateNotificationRead();
    }, []);
    return (
        <AnimatePresence>
            <motion.div
                key="modal"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: open ? 0 : "100%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                id="docs-sidebar"
                className="shadow-lg  top-0 fixed start-0 bottom-0  w-64 sm:w-96 pt-5 pb-10  border-gray-700 flex flex-col items-stretch gap-5"
                style={sidebarStyles}
            >
                <div>
                    <div className="flex justify-end px-2">
                        <button className={`${closeBtnStyle} bg-opacity-80 hover:bg-opacity-100 rounded-full p-1  `}
                            onClick={() => closeFn()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 pt-5">
                        <a className="flex-none text-2xl font-semibold text-gray-800 tracking-widest" href="#" aria-label="Brand">
                            Notifications
                        </a>
                    </div>
                </div>
                {/* close btn */}

                {/* notification card */}
                <div className=" px-3 h-full overflow-auto">
                    {!isLoading ? <>
                        {notificationData && notificationData.data && notificationData.data.length > 0 ?
                            <>
                                {notificationData.data.map((notif: SingleNotification, i: number) => (
                                    < Link to={`/fixtureDetails?id=${notif.notification.fixtureId}`} key={i} className="flex sm:items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4" >
                                        {!notif.notification.isRead.includes(notif.userId) && <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>}
                                        <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">{formatNotificationTime(notif.notification.date)}</span>

                                        {/* <input type="checkbox" className="mr-2" /> */}
                                        < img className="h-12 w-12 rounded-full" alt="John Doe's avatar"
                                            src={notif.clubImage} />
                                        <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                                            <h4 className="text-lg font-semibold leading-tight text-gray-900">{notif.clubName}</h4>
                                            <p className="text-sm text-gray-600">{notif.notification.message}</p>
                                        </div>
                                    </Link>
                                ))}
                            </> :

                            <div className="flex sm:items-center p-4 justify-center bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                                <h1>No new notifications</h1>
                            </div>
                        }
                    </>
                        :
                        <>
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                        </>
                    }
                </div>
            </motion.div >
        </AnimatePresence>
    );
};

export default Notification;
