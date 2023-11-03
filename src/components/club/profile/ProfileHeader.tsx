import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setState(selectedValue); // You might need to update the state here as well if needed
        switch (selectedValue) {
            case 'MY CLUB':
                navigate('/club/profile');
                break;
            case 'EDIT':
                navigate('/club/profile/edit');
                break;
            case 'BANNER':
                navigate('/club/profile/banner');
                break;
            case 'WALLET':
                navigate('/club/profile/wallet');
                break;
            default:
                break;
        }
    };

    return (
        <div className="px-4 md:px-14 sm:hidden">
            <div className="bg-white shadow-md flex rounded justify-center gap-7">
                <select
                    name=""
                    id=""
                    value={state}
                    onChange={handleSelectChange}
                    className="w-full rounded p-2 bg-white bg-opacity-95 shadow-md focus:outline-none text-center"
                   
                >
                    <option value="MY CLUB">MY CLUB</option>
                    <option value="EDIT">EDIT</option>
                    <option value="BANNER">BANNER</option>
                    <option value="WALLET">WALLET</option>
                </select>

            </div>
        </div>
    );
};

export default YourComponent;
