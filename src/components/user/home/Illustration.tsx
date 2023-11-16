import secureImg from '../../../assets/home/homeProtectIcon.png';
import ticketImg from '../../../assets/home/homeTicket.png';
import stdImg from '../../../assets/home/homestd.png'

const Illustration = () => {
    return (
        <div className="flex px-5 md:px-14 xl:px-28 mt-28 items-center gap-10 justify-between">
            <div className="">
                <div className="flex gap-4 mb-14">
                    <img src={ticketImg} className="h-16 p-5 bg-blue-100 rounded-lg" alt="" />
                    <div>
                        <h1 className="text-lg font-semibold text-gray-700">Find you favorite matches</h1>
                        <p className="max-w-3xl text-gray-700">Purchase you favorite team's matches within seconds with absolute affordable prices and enjoy the match at ease.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <img src={secureImg} alt="" className="h-16 p-5 bg-blue-100 rounded-lg" />
                    <div>
                        <h1 className="text-lg font-semibold text-gray-700">Secure & fast payment</h1>
                        <p className="max-w-3xl text-gray-700">No need to worry during the purchase of tickets since we provide secure environment and faster payment to save time with better efficiency.</p>
                    </div>
                </div>
            </div>
            <div className="md:block hidden">
                <img src={stdImg} alt="" className="w-80" />

            </div>
        </div>

    );
};

export default Illustration;
