import protectIcon from '../../../assets/fixture/protect-icon.png';

const FixtureHead = () => {
    return (
        <div className="sm:py-10 pt-10 pb-10">
            <div>
                <h1 className="text-4xl tracking-wide sm:text-6xl pb-2 sm:pb-4 text-gray-100 font-semibold" >Derby Dome Football Tickets</h1>
            </div>
            <div className="flex items-center gap-2 ">
                <img src={protectIcon} className="w-4 h-4" alt="" />
                <h1 className="text-white text-xs sm:text-base">Buy tickets for the upcoming matches safe & secured</h1>
            </div>
        </div>
    );
};

export default FixtureHead;
