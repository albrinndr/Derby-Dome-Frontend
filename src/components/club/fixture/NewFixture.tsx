import React, { useState } from "react";
import CommonHeader from "../headers/CommonHeader";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewFixture = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 10));

    const [value, onChange] = useState<Value>(futureDate);
    const [selectedOption, setSelectedOption] = useState('');
    const [checked, setChecked] = useState(false);

    const options = [
        { id: 'option1', label: '17:30' },
        { id: 'option2', label: '20:00' },
        { id: 'option3', label: '12:00' },
        { id: 'option4', label: '12:00' },
    ];


    const tileDisabled = ({ date, view }: { date: Date; view: string; }) => {
        if (view === 'month') {
            const timeDiff = date.getTime() - futureDate.getTime();
            const diffDays = timeDiff / (1000 * 3600 * 24);
            return diffDays < -1 || diffDays > 6;
        }
        return false;
    };

    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId);
    };

    return (
        <div>
            <CommonHeader />
            <div className="p-4 md:p-14 flex flex-col lg:flex-row gap-20 justify-center items-center lg:items-start">
                <div className="custom-calendar">
                    <Calendar onChange={onChange}
                        value={value}
                        className="text-center"
                        tileDisabled={tileDisabled} />

                </div>
                <div className="purchaseForm md:mt-0 mt-10">
                    <div className="">
                        <div>
                            <label htmlFor="">Select time: </label>
                            <div className="sm:flex gap-5 mt-2">
                                {options.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`bg-white border ${option.id === selectedOption ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-blue-50 text-gray-700'
                                            } px-8 py-2 rounded-lg`}
                                        onClick={() => handleOptionChange(option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            {!checked ?
                                <>
                                    <label htmlFor="">Select away team: </label><br />
                                    <select name="" id="" className="border w-60 h-10 rounded mt-2 focus:outline-slate-400">
                                        <option value="" className="text-center">---select---</option>
                                        <option value="">Madaskar</option>
                                        <option value="">Kerala</option>
                                        <option value="">JC p</option>
                                    </select>
                                </>
                                :
                                <>
                                    <label htmlFor="">Enter away team name: </label><br />
                                    <input type="text" className="h-10 mt-2 w-64 border-2 rounded focus:outline-slate-400" />
                                </>
                            }
                            <div className="flex items-center mt-2">
                                <input
                                    id="noneOfAbove"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    onClick={() => setChecked(!checked)}

                                />
                                <label htmlFor="noneOfAbove" className="ml-2 block text-sm text-gray-900">
                                    None of the above
                                </label>
                            </div>

                            <div className="mt-8">
                                <label htmlFor="image" className="p-2 px-4 bg-gray-300 rounded-sm cursor-pointer hover:bg-gray-400">
                                    <input type="file" id="image" className="hidden" />Upload match poster
                                </label>
                            </div>

                            <div className="flex items-center mt-8">
                                <label className="h-10 bg-rose-500 text-white text-center p-2">Coupon:</label>
                                <input type="text" placeholder="Enter your coupon code" className="p-2 h-10 focus:outline-slate-300 border-2" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="p-2 bg-green-500 hover:bg-green-600 w-80 rounded text-white font-semibold mt-8">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFixture;
