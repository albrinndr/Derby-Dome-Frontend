import React from "react";
import NavBar from "../../components/club/navbar/NavBar";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate()
  const backBtnHandler =()=>{
    navigate('/club/fixture/newFixture')
  }

  return (
    <>
      <NavBar color />

      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="bg-white p-8 m-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mr-3 animate-bounce"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* SVG path here */}
            </svg>
            <h1 className="text-3xl font-bold text-red-500">Payment Failed</h1>
          </div>
          <p className="text-gray-800 mb-4">
            We're sorry, but your payment was not successful. Please try again later.
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={backBtnHandler}
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
