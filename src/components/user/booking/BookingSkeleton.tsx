import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookingSkeleton = () => {

    return (
        <div className='mt-10'>
            <div className='mb-20 hidden sm:block'>
                <h1><Skeleton height={50} width={500} /></h1>
            </div>
            <div className='mb-20  sm:hidden'>
                <h1><Skeleton height={30} width={300} /></h1>
            </div>
            <div className="lg:flex lg:gap-20">
                <div className="lg:w-1/2 bg-white rounded border p-5">
                    <Skeleton height={240} count={1} />
                    <div className='mt-2'>
                        <Skeleton height={40} />
                    </div>
                    <div className='mt-2'>
                        <Skeleton height={100} count={1} />
                    </div>
                </div>

                <div className="p-5 px-10 lg:w-1/2 bg-white rounded border lg:ml-10 mt-10 lg:mt-0 transition-all duration-300">
                    <Skeleton height={300} count={1} />
                    <div className='mt-3'>
                        <Skeleton height={50} count={1} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSkeleton;
