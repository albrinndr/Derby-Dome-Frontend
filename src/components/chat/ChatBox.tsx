import { FormEvent, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { MdSend } from 'react-icons/md';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, sendMessage } from "../../api/chat";
import MessageSkeleton from "./MessageSkeleton";
import { io, Socket } from 'socket.io-client';

interface MessageI {
    senderId: {
        _id: string;
        name: string;
        profilePic: string;
    };
    text: string;
    createdAt: string;
}

interface User {
    id: string;
    name: string;
    profilePic: string;
}

const ChatBox = () => {
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [arriveMessage, setArriveMessage] = useState<MessageI | null>(null);

    const userData = localStorage.getItem('uLoggedIn');
    const parsedUserData: User = userData ? JSON.parse(userData) : null;

    const socket = useRef<Socket | undefined>();

    useEffect(() => {
        socket.current = io("ws://localhost:3000");
    }, []);

    const { isLoading, data, refetch } = useQuery({ queryKey: ['messages'], queryFn: getMessages });
    useEffect(() => {
        if (!isLoading && data) {
            setMessages(data.data);
        }
    }, [isLoading, data]);



    //set new message scroll
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const { mutate } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            refetch();
        }
    });

    //sending fn
    const messageHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newMessage.trim().length < 1) return;
        const text = newMessage;

        socket.current?.emit("sendMessage", {
            senderId: parsedUserData.id,
            text,
            name: parsedUserData.name,
            profilePic: parsedUserData.profilePic,

        });

        mutate(text);
        setNewMessage('');
    };

    //socket io getting and setting
    useEffect(() => {
        socket.current?.on("getMessage", (data) => {
            setArriveMessage({
                senderId: {
                    _id: data.senderId,
                    name: data.name,
                    profilePic: data.profilePic
                },
                text: data.text,
                createdAt: new Date().toISOString(),
            });
        });

    }, []);

    useEffect(() => {
        arriveMessage && setMessages((prev) => [...prev, arriveMessage]);
    }, [arriveMessage]);


    //shift enter

    return (
        <div className="container mx-auto bg-gray-50 rounded-lg shadow-lg">
            <div className="px-5 py-5 text-center  border-b-2 bg-white">
                <h1 className="font-semibold text-2xl">Derby Community</h1>
            </div>
            <div className="flex flex-row justify-between ">
                <div className="w-full px-6 md:px-10 flex flex-col justify-between">
                    <div className="flex flex-col mt-5 overflow-hidden  overflow-y-scroll" style={{ height: '27rem' }}>
                        {isLoading || !parsedUserData ? <>
                            <MessageSkeleton />
                            <MessageSkeleton own />
                            <MessageSkeleton />
                            <MessageSkeleton own />
                            <MessageSkeleton />
                        </> : <>
                            {messages.length > 0 &&
                                messages.map((message, index) => (
                                    <div key={index} ref={scrollRef}>
                                        <Message
                                            message={message}
                                            own={message.senderId._id === parsedUserData.id}
                                        />
                                    </div>
                                ))
                            }
                        </>
                        }

                    </div>
                    <div className="py-5  px-8 md:px-20">
                            <form onSubmit={messageHandler} className="flex gap-8 w-full bg-white border   px-3 rounded-xl">
                            <input
                                className="w-full focus:outline-none py-3"
                                type="text"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                autoFocus
                            />
                            <button className=" p-2 rounded-full">
                                <MdSend className="text-green-500" size={24} />
                            </button>
                            </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChatBox;
