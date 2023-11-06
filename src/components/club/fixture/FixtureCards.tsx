import React from "react";
// import logo1 from '../../../assets/fixLogo/Chelsea_FC.svg.png';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/slices/modalSlice";
import ConfirmationModal from "../../common/ConfirmationModal";
// import logo2 from '../../../assets/fixLogo/Netherlands_national_football_team_logo.svg.png';

interface Fixture {
    title: string,
    awayLogo: string,
    awayTeamName: string,
    date: string;
    time: string;
    id: string;
    cancelFn: (id: string) => void;
}

interface RootState {
    auth: {
        cLoggedIn: {
            name: string;
            image: string;
        };
    };
}

interface ModalState {
    modal: {
        showModal: boolean;
    };
}


const FixtureCards: React.FC<Fixture> = (props: Fixture) => {
    const date = new Date(props.date as string);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const { cLoggedIn } = useSelector((state: RootState) => state.auth);

    const cancelFixture = async (id: string) => {
        props.cancelFn(id);
    };

    const { showModal } = useSelector((state: ModalState) => state.modal);
    const dispatch = useDispatch();

    const cancelModalHandler = () => {
        dispatch(openModal());
    };

    return (
        <>
            <div className="bg-white rounded-xl mb-10 shadow shadow-gray-300 lg:mx-32 relative z-0">
                <div className="flex justify-between items-center border-b-4 border-customBg px-4 py-2">
                    <h1 className="text-md md:text-lg tracking-widest ">{props.title}</h1>
                    <button className="sm:px-4 sm:py-2 py-1 px-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                        onClick={cancelModalHandler}
                    >Cancel</button>

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
            {showModal && <ConfirmationModal confirmFn={cancelFixture} id={props.id} />}

        </>

    );
};

export default FixtureCards;
