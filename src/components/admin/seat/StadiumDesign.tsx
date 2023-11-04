import stadiumImg from '../../../assets/stadium/stadiumField.png';

const StadiumDesign = () => {
    return (
            <div className=" h-fit">
                <img src={stadiumImg} alt="" width={600} className='rounded-lg border-2 border-gray-300' />
            </div>
    );
};

export default StadiumDesign;
