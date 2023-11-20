import Checkout from "../../components/user/checkout/Checkout";
import NavBar from "../../components/user/NavBar";

const UserCheckout = () => {
    return (
        <div>
            <NavBar />
            
            <div className="px-5 md:px-14 xl:px-28 py-10">
                <Checkout />
            </div>
            
        </div>
    );
};

export default UserCheckout;
