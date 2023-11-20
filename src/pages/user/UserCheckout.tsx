import Checkout from "../../components/user/checkout/Checkout";
import NavBar from "../../components/user/NavBar";
import { getCheckoutData } from "../../api/user";
import { useEffect, useState } from "react";

interface CheckoutData {
    cart: {
        createdAt: string;
        price: number;
        section: string;
        stand: string;
        ticketCount: string;
        seats: [{ row: string; userSeats: number[]; }];
    };
    fixture: {
        _id: string;
        awayTeam: string;
        clubId: { name: string; };
        date: string;
        time: string;
    };
}

const UserCheckout = () => {
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>();
    const [isLoading, setIsLoading] = useState(true);

    const localStorageData = localStorage.getItem('uLoggedIn');
    const userData = localStorageData && JSON.parse(localStorageData);

    async function fetchData() {
        const data = await getCheckoutData();
        if (data) {
            setCheckoutData(data.data);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    console.log(checkoutData);


    return (
        <div>
            <NavBar />
            <div className="px-5 md:px-14 xl:px-28 py-10">
                {!isLoading &&
                    <>
                        {checkoutData && checkoutData?.cart === null || !checkoutData
                            ? <div className="grid place-content-center" style={{ minHeight: '80vh' }}>
                                <h1 className="text-2xl font-extrabold text-yellow-500">Your cart is empty!</h1>
                            </div>
                            : <Checkout data={checkoutData} refetchFn={fetchData} wallet={userData?.wallet} />
                        }
                    </>
                }
            </div>

        </div>
    );
};

export default UserCheckout;
