import React, { CSSProperties } from "react";

interface NotificationI {
    closeFn: () => void;
    color?: boolean;
    open: boolean;
}

const Notification: React.FC<NotificationI> = ({ closeFn, color, open }) => {
    const closeBtnStyle = color ? 'bg-white' : 'bg-gray-200';

    const sidebarStyles: CSSProperties = {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 60,
        transition: "transform 0.3s cubic-bezier(0.65, 0.05, 0.36, 1)",
        transform: open ? "translateX(0)" : "translateX(-100%)",
    };
    return (
        <div
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
                <div className="flex items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">4:36 PM</span>

                    <input type="checkbox" className="mr-2" />
                    <img className="h-12 w-12 hidden sm:block rounded-full" alt="John Doe's avatar"
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

                    <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                        <h4 className="text-lg font-semibold leading-tight text-gray-900">Manchester United</h4>
                        <p className="text-sm text-gray-600">Book your tickets for match against kerala FC</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">4:36 PM</span>

                    <input type="checkbox" className="mr-2" />
                    <img className="h-12 w-12 hidden sm:block rounded-full" alt="John Doe's avatar"
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

                    <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                        <h4 className="text-lg font-semibold leading-tight text-gray-900">Manchester United</h4>
                        <p className="text-sm text-gray-600">Book your tickets for match against kerala FC</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">4:36 PM</span>

                    <input type="checkbox" className="mr-2" />
                    <img className="h-12 w-12 hidden sm:block rounded-full" alt="John Doe's avatar"
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

                    <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                        <h4 className="text-lg font-semibold leading-tight text-gray-900">Manchester United</h4>
                        <p className="text-sm text-gray-600">Book your tickets for match against kerala FC</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white bg-opacity-70 rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">4:36 PM</span>

                    <input type="checkbox" className="mr-2" />
                    <img className="h-12 w-12 hidden sm:block rounded-full" alt="John Doe's avatar"
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

                    <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                        <h4 className="text-lg font-semibold leading-tight text-gray-900">Manchester United</h4>
                        <p className="text-sm text-gray-600">Book your tickets for match against kerala FC</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xl mx-auto max-w-sm relative m-4">
                    <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">New</span>
                    <span className="text-xs font-semibold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0">4:36 PM</span>

                    <input type="checkbox" className="mr-2" />
                    <img className="h-12 w-12 hidden sm:block rounded-full" alt="John Doe's avatar"
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80" />

                    <div className="ml-2 cursor-pointer pb-2 pt-3 ">
                        <h4 className="text-lg font-semibold leading-tight text-gray-900">Manchester United</h4>
                        <p className="text-sm text-gray-600">Book your tickets for match against kerala FC</p>
                    </div>
                </div>
            </div>
            {/* notification card end */}
            {/* <div className=" px-3  w-full">
                <div className="bg-white rounded-lg p-2 text-center border cursor-pointer">

                    <h1>Mark all as read</h1>
                </div>
            </div> */}


        </div>
    );
};

export default Notification;
