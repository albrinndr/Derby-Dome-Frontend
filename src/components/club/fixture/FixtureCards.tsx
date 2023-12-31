import React, { useState } from "react";
import { useSelector } from "react-redux";
import CancelConfirmation from "./CancelConfirm";

interface Fixture {
    title: string,
    awayLogo: string,
    awayTeamName: string,
    date: string;
    time: string;
    id: string;
    cancelFn: (id: string) => void;
    createdAt: Date;
    checkDate: Date;
}

interface RootState {
    auth: {
        cLoggedIn: {
            name: string;
            image: string;
        };
    };
}


const FixtureCards: React.FC<Fixture> = (props: Fixture) => {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const date = new Date(props.date as string);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const { cLoggedIn } = useSelector((state: RootState) => state.auth);

    const cancelFixture = async (id: string) => {
        props.cancelFn(id);
    };


    const cancelModalHandler = () => {
        setShowCancelModal(true);
    };

    const today = new Date();
    const checkDate = new Date(props.checkDate);
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);
    // return today > checkDate;

    return (
        <>
            <div className="bg-white rounded-xl mb-10 shadow shadow-gray-300 lg:mx-32 relative z-0">
                <div className="flex justify-between items-center border-b-4 border-customBg px-4 py-2">
                    <h1 className="text-md md:text-lg tracking-widest ">{props.title}</h1>
                    {today < checkDate && <button className="sm:px-4 sm:py-2 py-1 px-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                        onClick={cancelModalHandler}
                    >Cancel</button>}

                </div>
                <div className="px-2 pt-2 pb-1 grid-cols-3 grid">
                    <div className="text-center flex justify-center items-center flex-col">
                        <img src={cLoggedIn.image} className="w-16 sm:w-16" alt="" />
                        <h1 className="text-xs sm:text-lg uppercase">{cLoggedIn.name}</h1>
                    </div>
                    <div className="text-center text-xs sm:text-lg grid place-content-center font-semibold p-2">
                        <h1 className="leading-8">{formattedDate}</h1>
                        <h1 className="leading-8">{props.time}</h1>
                    </div>

                    <div className="text-center flex justify-center items-center flex-col">
                        <img src={props.awayLogo} className="w-16 sm:w-16" alt="" />
                        <h1 className="text-xs sm:text-lg uppercase">{props.awayTeamName}</h1>
                    </div>

                </div>
                <div className="text-center">
                    <h1 className="text-md font-semibold pb-4">Derby Dome Stadium</h1>
                </div>
            </div>
            {showCancelModal && <CancelConfirmation confirmFn={cancelFixture} id={props.id} closeFn={() => setShowCancelModal(false)} />}

        </>

    );
};

export default FixtureCards;
