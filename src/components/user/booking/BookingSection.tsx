import React, { useEffect, useState } from "react";
import stadiumImg from '../../../assets/stadium/stadium.png';
import { useNavigate } from "react-router-dom";
import styles from '../fixture/FixtureCards.module.css';
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../../api/user";
import { BookingSectionI, CartData, FixtureSeat, Seat, StandSeats } from "./BookingSectionInterface";

//images
import northVipImg from '../../../assets/stadium/vip/north.png';
import southVipImg from '../../../assets/stadium/vip/south.png';
import eastVipImg from '../../../assets/stadium/vip/east.png';
import westVipImg from '../../../assets/stadium/vip/west.png';

import northPremiumImg from '../../../assets/stadium/premium/north.png';
import southPremiumImg from '../../../assets/stadium/premium/south.png';
import eastPremiumImg from '../../../assets/stadium/premium/east.png';
import westPremiumImg from '../../../assets/stadium/premium/west.png';

import northEconomyImg from '../../../assets/stadium/economy/north.png';
import southEconomyImg from '../../../assets/stadium/economy/south.png';
import eastEconomyImg from '../../../assets/stadium/economy/east.png';
import Loader from "../../common/Loader";



const BookingSection: React.FC<BookingSectionI> = ({ data, refetchFn }) => {
  const [ticketCount, setTicketCount] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [selectedStand, setSelectedStand] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const imageUrls: string[] = [
      northVipImg, southVipImg, eastVipImg, westVipImg,
      northPremiumImg, southPremiumImg, eastPremiumImg, westPremiumImg,
      northEconomyImg, southEconomyImg, eastEconomyImg
    ];

    const preloadImages = (urls: string[]) => {
      urls.forEach((url: string) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages(imageUrls);
  }, []);

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


  const navigate = useNavigate();
  const { status, mutate: bookingMutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: ((res) => {
      if (res) {
        navigate('/checkout');
      } else {
        toast.error('An error occurred!');
      }
      refetchFn();
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
      ticketCount: ticketCount,
      type: 'normal'
    };
    bookingMutate(bookingData);
  };

  const vipNavigate = () => {
    refetchFn();
    navigate(`/bookingVip?id=${data.fixture._id}&stand=${selectedStand}&section=${selectedSection}`);
  };

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
                        const totalCount = seatData.economy.E.count + seatData.economy.F.count;
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
                        const totalCount = seatData.premium.C.count + seatData.premium.D.count;
                        const sectionData = data.cartData[seat.toLowerCase() as keyof CartData];
                        const cartSeatCount = sectionData['premium'];

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
            <div className="flex items-center mt-12 lg:mt-20 justify-center">
              {selectedSection !== 'vip' && <button className={`${styles.button_48} w-full`} onClick={submitHandler}><span>CONFIRM</span></button>
              }
              {selectedSection === 'vip' && <button onClick={vipNavigate} className={`${styles.button_48} w-full`}><span>CONFIRM</span></button>
              }
            </div>
          </div>
        </div>


        {/* image */}
        <div className="p-5 px-10 lg:w-1/2 bg-white rounded border lg:ml-10 mt-10 lg:mt-0 transition-all duration-300">
          {!selectedSection && !selectedStand && <img src={stadiumImg}
            className={`opacity-0 transition-opacity duration-300 ${!selectedSection && !selectedStand ? 'opacity-100' : 'opacity-0'
              }`}
            alt="" />}

          {selectedSection == "vip" && selectedStand == "north" && <img src={northVipImg}
            className=""
            alt="" />}

          {selectedSection == "premium" && selectedStand == "north" && <img src={northPremiumImg}
            className=""
            alt="" />}

          {selectedSection == "economy" && selectedStand == "north" && <img src={northEconomyImg}
            className=""
            alt="" />}

          {selectedSection == "vip" && selectedStand == "south" && <img src={southVipImg} className="" alt="" />}
          {selectedSection == "premium" && selectedStand == "south" && <img src={southPremiumImg} className="" alt="" />}
          {selectedSection == "economy" && selectedStand == "south" && <img src={southEconomyImg} className="" alt="" />}

          {selectedSection == "vip" && selectedStand == "east" && <img src={eastVipImg} className="" alt="" />}
          {selectedSection == "premium" && selectedStand == "east" && <img src={eastPremiumImg} className="" alt="" />}
          {selectedSection == "economy" && selectedStand == "east" && <img src={eastEconomyImg} className="" alt="" />}

          {selectedSection == "vip" && selectedStand == "west" && <img src={westVipImg} className="" alt="" />}
          {selectedSection == "premium" && selectedStand == "west" && <img src={westPremiumImg} className="" alt="" />}

          <h1 className="text-center mt-2 tracking-widest">Derby Dome Stadium</h1>
        </div>
      </div>
      {status === 'pending' && <Loader />}
    </div>
  );

};

export default BookingSection;
