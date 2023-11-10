import React from "react";
import Club1 from '../../../assets/fixture/club1.png';
import Club2 from '../../../assets/fixture/club2.webp';
import styles from './FixtureCards.module.css';

const FixtureCards = () => {

    return (
        <div className="bg-white rounded-lg border border-gray-200  hover:shadow mt-10" >
            <div className="p-4 lg:flex lg:justify-between lg:gap-2">
                <div className="flex lg:flex-col gap-2 lg:gap-0 justify-center text-center w-full lg:w-28 lg:py-1 py-3 px-2 bg-green-100  rounded-md leading-5">
                    <small className="text-gray-500 font-semibold ">Friday</small>
                    <h1 className="font-bold text-gray-800 ">NOV 10</h1>
                    <small className="text-gray-500 font-semibold ">2023</small>
                </div>

                <div className="flex justify-center  mt-5 lg:mt-0 items-center lg:ml-5 gap-3">
                    <div className="">
                        <img src={Club1} width={30} alt="" />
                        <p></p>
                    </div>

                    <div className="font-bold lg:flex lg:gap-3 text-center tracking-widest lg:tracking-wider text-gray-700 w-fit">
                        <h1>MANCHESTER UNITED</h1>
                        <h1 className="text-red-600">vs</h1>
                        <h1>KERALA BLASTERS</h1>
                    </div>
                    <div className="">
                        <img src={Club2} width={30} alt="" />
                    </div>
                </div>

                <div className="text-center font-semibold mt-5 lg:mt-0  text-gray-800">
                    <h1>Derby Dome football stadium, India</h1>
                    <h1>08:30 PM</h1>
                </div>
                <div className="flex items-center mt-5 lg:mt-0 justify-center">
                    <button className={styles.button_48}><span>BOOK NOW</span></button>
                </div>
            </div>
        </div>
    );
};

export default FixtureCards;
