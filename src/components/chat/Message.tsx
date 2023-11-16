import React from "react";
import { format } from 'timeago.js';

interface Message {
    own?: boolean;
    message: {
        senderId: {
            name: string;
            profilePic: string;
        };
        text: string;
        createdAt: string;
    };
}

const Message: React.FC<Message> = ({ own, message }) => {
    return (
        <div className={`flex flex-col mt-5 ${own ? 'items-end' : ''}`}>
            <div className="flex">
                {!own && (
                    <img
                        className={`w-8 h-8 rounded-full object-cover mr-2 ${own ? 'ml-2' : 'mr-2'}`}
                        src={message.senderId.profilePic}
                        alt=""
                    />
                )}
                <div className={`p-1 px-2  bg-gray-300 text-black max-w-xl  ${own ? 'bg-green-500 text-white  rounded-bl-lg rounded-t-lg'
                    : 'bg-gray-300 text-black rounded-tr-lg rounded-b-lg'}`}>
                    {!own && <div className='text-blue-700'>
                        <p className="text-sm font-semibold ">{message.senderId.name}</p>
                    </div>}
                    <p className="text-sm ">
                        {message.text}
                    </p>
                    <div className={`${own ? 'text-start opacity-95' : 'text-end text-gray-600'} text-xs mt-2 `}>{format(message.createdAt)}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
