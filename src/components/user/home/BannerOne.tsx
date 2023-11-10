import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Image {
    banners?: {
        image: string;
        text: string;
    }[];
}
const BannerOne: React.FC<Image> = ({ banners }) => {
    const settings = {
        dots: true,
        infinite: true, // Enables infinite looping
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enables automatic sliding
        autoplaySpeed: 5000, // Adjust the speed as needed
    };

    const defaultImage = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698151130/userManagement/zu797ljiskrvdxbb54p7.png';
    // const defaultText = 'Get tickets to top tier football Matches';
    const defaultText = '';

    return (
        <div className='overflow-hidden'>
            <Slider {...settings}>
                {banners &&
                    banners.map((item, index) => (
                        <div key={index}>
                            <div
                                className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full"
                                style={{
                                    backgroundImage: `url(${item.image || defaultImage})`,
                                    height: '90vh',
                                    transition: 'background-image 0.5s ease-in-out' // Adjust the height as required
                                }}
                            >
                                <h1
                                    className="text-white text-4xl sm:text-6xl px-10 text-center"
                                    style={{ textShadow: '2px 2px 4px #000000' }}
                                >
                                    {item.text || defaultText}
                                </h1>
                            </div>
                        </div>
                    ))}
            </Slider>
        </div>
    );
};

export default BannerOne;

