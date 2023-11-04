import React, { useState, FormEvent, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Timings.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMatchTime, getAllTimes } from "../../../api/stadium";
import TimeTable from "./TimeTable";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Timings = () => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 12));

  const [value, onChange] = useState<Value>(futureDate);
  const [time, setTime] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [matchTimes, setMatchTimes] = useState<[]>([]);


  const { isLoading, data: times, refetch } = useQuery({ queryKey: ['matchTimes'], queryFn: getAllTimes });
  useEffect(() => {
    if (times) {
      setMatchTimes(times.data);
    }
  }, [times]);

  const { mutate } = useMutation({
    mutationFn: addMatchTime,
    onSuccess: () => {
      refetch();
    }
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(time, price);
    mutate({ time, price });
    setTime('');
    setPrice(0);
  };

  return (
    <div className="p-4 md:p-14 md:pr-16 min-h-screen text-center mb-10">
      <h1 className="text-gray-700">Changes will only be applied to the dates after <span className="font-semibold">{futureDate.toDateString()}</span></h1>
      <div className="lg:flex lg:items-center justify-center mt-2">
        <div className="w-full sm:max-w-md p-2 custom-calendar flex justify-center">
          <Calendar onChange={onChange} value={value} className="text-center" />
        </div>
        <div className=" justify-center flex">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <form onSubmit={submitHandler} className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="time"
                  className="border h-12 focus:outline-slate-300 rounded mt-3 w-44 sm:w-40 md:w-52"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <div className="relative flex items-center">
                  <span className="absolute bg-gray-300 pr-3 inset-y-0 left-0 flex top-3 items-center pl-3 text-gray-700">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="border h-12 pl-10 focus:outline-none text-md rounded mt-3 w-44 sm:w-40 md:w-52"
                    placeholder="Price"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-green-500 flex items-center hover:bg-green-600 px-4 py-2 text-white rounded-lg uppercase"
                  type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white cursor-pointer mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H3a1 1 0 1 1 0-2h6V3a1 1 0 0 1 1-1z"
                    />
                  </svg>
                  Add Time
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
      {!isLoading && <TimeTable times={matchTimes} refetchFn={refetch} />}
    </div>
  );
};

export default Timings;
