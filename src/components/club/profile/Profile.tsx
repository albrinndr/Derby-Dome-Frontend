import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CiLocationOn } from 'react-icons/ci';

interface RootState {
    auth: {
        cLoggedIn: {
            description: string;
            address: string;
        };
    };
}

const Profile = () => {
    const [clubDesc, setClubDesc] = useState('');
    const [clubAddress, setClubAddress] = useState('');

    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        setClubDesc(cLoggedIn.description);
        setClubAddress(cLoggedIn.address);
    }, [cLoggedIn]);

    return (
        <div className="p-4 md:p-14">
            <p className="text-lg">{clubDesc}</p>
            <br />
            <div className="flex">
                <CiLocationOn /><p className="text-lg">{clubAddress}</p>
            </div>
        </div>
    );
};

export default Profile;
