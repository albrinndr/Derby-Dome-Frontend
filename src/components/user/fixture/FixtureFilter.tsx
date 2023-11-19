import React, { useEffect, useState } from "react";
import TeamFilterIcon from '../../../assets/fixture/team filter icon.svg';
import TeamDateIcon from '../../../assets/fixture/match filter icon.svg';
import Calendar from "react-calendar";
import './FixtureFilter.css';

type TileDisabledFunction = ({ date, view }: { date: Date; view: string; }) => boolean;
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FixtureFilter {
    filterTeam: (val: string) => void;
    filterDate: (val: string) => void;
    teams: [];
}

const FixtureFilter: React.FC<FixtureFilter> = ({ filterDate, filterTeam, teams }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedItem, setSelectedItem] = useState('All team matches');
    const [date, setDate] = useState<Value>();

    useEffect(() => {
        if (selectedItem === 'All team matches') {
            filterTeam('');
        } else {
            filterTeam(selectedItem);
        }
        let newDate = '';
        if (date) {
            const d = new Date(`${date}`);
            newDate = d.toISOString();
        }
        filterDate(newDate);
    }, [date, selectedItem, filterDate, filterTeam]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    const handleOptionClick = (option: string) => {
        setSelectedItem(option);
        setIsOpen(false);
    };
    const handleOptionClick2 = () => {
        setIsOpen2(false);
    };

    const today = new Date();

    const tileDisabled: TileDisabledFunction = ({ date, view }) => {
        if (view === 'month') {
            return date < today;
        }
        return false;
    };

    const formattedDate = date !== undefined
        ? Array.isArray(date)
            ? `${date[0]?.toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric',
            })} - ${date[1]?.toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric'
            })}`
            : date?.toLocaleDateString('en-US', {
                day: 'numeric', month: 'short', year: 'numeric',

            })
        : 'Show all dates';


    return (
        <div className="md:flex md:justify-between md:gap-10 flex-row items-center justify-center">
            <div className="relative  text-left lg:w-1/2 w-full">
                <button
                    type="button"
                    className="bg-white rounded-md w-full flex  items-center justify-between px-2 py-1 border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none h-16"
                    onClick={toggleDropdown2}
                >
                    <div className="flex gap-3">
                        <img
                            className="w-12 mr-2"
                            src={TeamDateIcon}
                            alt="Dropdown Icon"
                        />
                        <div className="text-start">
                            <h1 className="font-semibold text-md tracking-wide">Filter by Date</h1>
                            <h1 className="text-bold sm:text-lg">
                                {formattedDate}
                            </h1>
                        </div>
                    </div>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${isOpen2 ? 'rotate-180' : ''
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12l-6-6h12l-6 6z"
                        />
                    </svg>
                </button>
                {isOpen2 && (
                    <div className="absolute z-10 w-full right-0 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto z-50">
                        <div className="w-full" onClick={handleOptionClick2}>
                            <div className="text-end">
                                <button className="bg-red-500 text-white p-2 " onClick={() => setDate(null)}>Show all dates</button>
                            </div>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="text-center relative w-screen border-0"
                                tileDisabled={tileDisabled}

                            />
                        </div>
                    </div>

                )}
            </div><br />
            {/* filter by team */}
            <div className="relative  text-left lg:w-1/2 w-full">
                <button
                    type="button"
                    className="bg-white rounded-md w-full flex  items-center justify-between px-2 py-1 border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none h-16"
                    onClick={toggleDropdown}
                >
                    <div className="flex gap-3">
                        <img
                            className="w-12 mr-2"
                            src={TeamFilterIcon}
                            alt="Dropdown Icon"
                        />
                        <div className="text-start">
                            <h1 className="font-semibold text-md tracking-wide">Filter by Team</h1>
                            <h1 className="text-bold sm:text-lg"> {selectedItem}</h1>
                        </div>
                    </div>
                    <svg
                        className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''
                            }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 12l-6-6h12l-6 6z"
                        />
                    </svg>
                </button>
                {isOpen && (
                    <div className="absolute w-full right-0 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto z-10">
                        <ul className="py-1">
                            <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleOptionClick('All team matches')}
                            >
                                <h1 className="text-semibold text-lg tracking-wider">All team matches</h1>
                            </li>
                            {teams.map((option) => (
                                <li
                                    key={option[1]}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleOptionClick(option[0])}
                                >
                                    <h1 className="text-semibold text-lg tracking-wider">{option[0]}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}
            </div>
        </div>
    );
};

export default FixtureFilter;
