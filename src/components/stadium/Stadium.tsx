import React, { useState } from "react";
import stadiumImg from '../../assets/stadium/stadium.png';
import stadiumImg2 from '../../assets/stadium/stadium2.png';

const Stadium = () => {
    const [show, setShow] = useState(true);
    const showHandler = () => {
        setShow(!show);
    };
    return (
        <div>
            {show && <img src={stadiumImg} alt="" className="w-1/2"/>}
            {!show && <img src={stadiumImg2} alt="" className="w-1/2"/>}
            <button className="bg-blue-500 p-2 rounded text-white hover:shadow-inner hover:bg-blue-600" onClick={showHandler}>Choose</button>
        </div>

    );
};

export default Stadium;
