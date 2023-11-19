import React, { useEffect, useState } from "react";
import stadiumImg from '../../../assets/stadium/stadium.png';
import { Link } from "react-router-dom";
import styles from '../fixture/FixtureCards.module.css';
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../../api/user";
import { BookingSectionI, CartData, FixtureSeat, Seat, StandSeats } from "./BookingSectionInterface";



const BookingSection: React.FC<BookingSectionI> = ({ data }) => {
  const [ticketCount, setTicketCount] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [selectedStand, setSelectedStand] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const seatPosition = selectedItem.toLowerCase();
    const seatArr = seatPosition.split(' ');
    setSelectedStand(seatArr[0]);
    setSelectedSection(seatArr[1]);
  }, [selectedItem]);

  const handleOptionClick = (option: string) => {
    setSelectedItem(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const ticketCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketCount(Number(e.target.value));
    setSelectedItem('');
  };

  const vip = ['North', 'South', 'East', 'West'];
  const economy = ['North', 'South', 'East'];
  const premium = ['North', 'South', 'East', 'West'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const priceObj: any = {};

  data.seats.forEach((seat: Seat) => {
    priceObj[seat.stand] = seat.price;
  });

  // Booking

  const { mutate: bookingMutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: ((res) => {
      if (res) {
        toast.success("Added to cart");
        console.log(res.data);
      }
    })
  });

  const submitHandler = () => {
    if (selectedItem === '') {
      toast.error('Choose your spot!');
      return;
    }
    const bookingData = {
      fixtureId: data.fixture._id,
      stand: selectedStand,
      section: selectedSection,
      ticketCount: ticketCount
    };
    bookingMutate(bookingData);
  };
  console.log(data.cartData);

  return (
    <div>
      <div className="lg:flex  lg:gap-20">

        {/* select */}
        <div className="lg:w-1/2 bg-white rounded border p-5">
          <h1 className="text-2xl text-center">Choose your ticket options</h1>
          <div className="mt-10">
            <h1 className="sm:text-lg text-center mb-2">Select ticket count</h1>
            <div className="flex flex-col items-center justify-center">
              <input className="sm:w-96 sm:h-5  bg-gray-200 appearance-none rounded-full overflow-hidden outline-none"
                type="range" min="1" max="10" value={ticketCount} onChange={ticketCountHandler}
              />
              <div className="sm:w-96 flex justify-between mt-3 gap-1">
                <div>1</div>
                <div className="sm:hidden">-</div>
                <div>10</div>
              </div>
              <h1 className="sm:text-lg font-semibold mt-1">Tickets : {ticketCount}</h1>
            </div>
          </div>

          <div className="relative  text-left w-full mt-10">
            <button
              type="button"
              className="bg-white rounded-md w-full flex  items-center justify-between px-2 py-1 border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none h-16"
              onClick={toggleDropdown}
            >
              <div className="flex gap-3">
                <div className="text-start">
                  <h1 className="font-semibold text-md tracking-wide">Select stadium position</h1>
                  <h1 className="text-bold sm:text-lg "> {selectedItem}</h1>
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
                  {
                    economy.map((seat, i) => {
                      if ('economy' in data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']]) {
                        const seatData = data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']] as StandSeats;
                        const totalCount = seatData.economy.E + seatData.economy.F;
                        const sectionData = data.cartData[seat.toLowerCase() as keyof CartData];
                        const cartSeatCount = sectionData['economy'];
                        if ((totalCount - cartSeatCount) >= ticketCount) {
                          return (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 mt-1 cursor-pointer flex justify-between items-center"
                              onClick={() => handleOptionClick(`${seat} Economy`)}
                            >
                              <h1 className="text-semibold sm:text-lg tracking-wider">{seat} Economy</h1>
                              <h1 className="text-semibold sm:text-lg tracking-wider">₹ {priceObj[seat.toLowerCase()].economy}</h1>
                            </li>
                          );
                        }
                      }
                      return null;
                    })
                  }

                  {
                    premium.map((seat, i) => {
                      if ('premium' in data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']]) {
                        const seatData = data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']] as StandSeats;
                        const totalCount = seatData.premium.C + seatData.premium.D;
                        const sectionData = data.cartData[seat.toLowerCase() as keyof CartData];
                        const cartSeatCount = sectionData['premium'];
                        const diff = totalCount - cartSeatCount;
                        console.log(diff);

                        if ((totalCount - cartSeatCount) >= ticketCount) {
                          return (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 mt-1 cursor-pointer flex justify-between items-center"
                              onClick={() => handleOptionClick(`${seat} Premium`)}
                            >
                              <h1 className="text-semibold sm:text-lg tracking-wider">{seat} Premium</h1>
                              <h1 className="text-semibold sm:text-lg tracking-wider">₹ {priceObj[seat.toLowerCase()].premium}</h1>
                            </li>
                          );
                        }
                      }
                      return null;
                    })
                  }
                  {
                    vip.map((seat, i) => {
                      if ('vip' in data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']]) {
                        const seatData = data.fixture.seats[seat.toLowerCase() as keyof FixtureSeat['seats']] as StandSeats;
                        const totalCount = seatData.vip.A.count + seatData.vip.B.count;
                        const sectionData = data.cartData[seat.toLowerCase() as keyof CartData];
                        const cartSeatCount = sectionData['vip'];

                        if ((totalCount - cartSeatCount) >= ticketCount) {
                          return (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-gray-100 mt-1 cursor-pointer flex justify-between items-center"
                              onClick={() => handleOptionClick(`${seat} VIP`)}
                            >
                              <h1 className="text-semibold sm:text-lg tracking-wider">{seat} VIP</h1>
                              <h1 className="text-semibold sm:text-lg tracking-wider">₹ {priceObj[seat.toLowerCase()].vip}</h1>
                            </li>
                          );
                        }
                      }
                      return null;
                    })
                  }
                </ul>
              </div>

            )}
            <div className="flex items-center mt-12 justify-center">
              {selectedSection !== 'vip' && <button className={`${styles.button_48} w-full`} onClick={submitHandler}><span>CONFIRM</span></button>
              }
              {selectedSection === 'vip' && <Link to={`/vip`} className={`${styles.button_48} w-full`} onClick={submitHandler}><span>CONFIRM</span></Link>
              }
            </div>
          </div>
        </div>


        {/* image */}
        <div className="p-5 px-10 lg:w-1/2 bg-white rounded border lg:ml-10 mt-10 lg:mt-0">
          <img src={stadiumImg} className="" alt="" />
        </div>
      </div>
    </div>
  );

};

export default BookingSection;
