import NavBar from "../components/club/navbar/NavBar";
import NavBarUser from "../components/user/NavBar";
import NotFound from "./NotFound";

const PaymentSuccess = () => {
  const user = localStorage.getItem('uLoggedIn');
  const club = localStorage.getItem('clubInfo');
  const hidePage = !user && !club;

  return hidePage ? (
    <NotFound />
  ) : (
    <>
      {club && <NavBar color />}
      {user && <NavBarUser />}

      {/* <div className="flex flex-col items-center justify-center  h-screen bg-gradient-to-r from-green-400 to-blue-500"> */}
      <div className="flex flex-col items-center justify-center  h-screen bg-gray-200">
        <div className="bg-white p-10 rounded-lg shadow-lg m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-bold text-center mb-4">Payment Successful!</h1>
          <p className="text-gray-700 text-center">
            Thank you for your payment. Your transaction has been completed successfully.
          </p>
          {/* <div className="text-center">
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
              Continue Shopping
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
