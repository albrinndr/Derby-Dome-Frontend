import React, { useEffect, useState } from "react";
import { GoSearch } from 'react-icons/go';

interface SearchSection {
    typeFn: (val: string) => void;
    searchFn: (val: string) => void;
}

const SearchSection: React.FC<SearchSection> = ({ typeFn, searchFn }) => {
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('Fixtures');

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    useEffect(() => {
        typeFn(type);
        searchFn(search);
    }, [type, search, typeFn, searchFn]);

    return (
        <div className="text-center mt-10 mb-14 md:mb-20 md:mt-24">
            <div>
                <h1 className="text-gray-600 text-2xl md:text-4xl font-semibold">Find your favorite team's matches</h1>
            </div>
            <div className="mt-8 hidden md:flex justify-center">
                <div className="shadow-lg p-5 w-2/3 border rounded-lg flex items-center justify-between gap-5">
                    <div className="flex w-full">
                        <div className="border-r pr-2">
                            <select className="w-24 border-0 focus:outline-none text-gray-500"
                                value={type}
                                onChange={handleTypeChange}
                            >
                                <option value="Fixtures" className="focus:outline-none">Fixtures</option>
                                <option value="Clubs" className="focus:outline-none">Clubs</option>
                            </select>
                        </div>
                        <div className="flex items-center w-full ml-4">
                            <div className="text-gray-600 text-lg"><GoSearch /></div>
                            <div className="ml-5 flex-grow">
                                <input type="text" className="caret-blue-700 border-0 focus:outline-none w-full text-lg "
                                    placeholder="Search your favorite matches or clubs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus

                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit">
                        <button className="p-2 px-4 bg-blue-700 hover:bg-blue-800 transition-all duration-100 ease-in-out shadow-inner text-white rounded-lg text-lg">Search</button>

                    </div>
                </div>
            </div>

            <div className="mt-5 md:hidden">
                <div className=" text-start">
                    <select className="w-24 border-0 focus:outline-none text-gray-500"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <option value="Fixtures" className="focus:outline-none">Fixtures</option>
                        <option value="Clubs" className="focus:outline-none">Clubs</option>
                    </select>
                </div>
                <div className="flex items-center shadow-lg border rounded-lg p-3 mt-3">
                    <div className="text-gray-600 text-lg"><GoSearch /></div>
                    <div className="ml-5 flex-grow">
                        <input
                            type="text"
                            className="border-0 focus:outline-none  w-full text-gray-800 caret-blue-700"
                            placeholder="Search your favorite matches or clubs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SearchSection;
