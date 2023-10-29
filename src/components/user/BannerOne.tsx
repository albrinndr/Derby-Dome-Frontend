import React from 'react';

interface Image {
    data?: {
        image: string;
        text: string;
    };
}

const BannerOne: React.FC<Image> = ({ data }) => {


    const defaultImage = 'https://res.cloudinary.com/ddzzicdji/image/upload/v1698151130/userManagement/zu797ljiskrvdxbb54p7.png';
    const defaultText = 'Get tickets to top tier football Matches';

    const divStyle = {
        backgroundImage: `url(${data && data.image || defaultImage})`,
        height: '90vh', // Adjust the height as required
    };

    return (
        <div className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full" style={divStyle}>
            <h1 className="text-white text-4xl sm:text-6xl px-10 text-center" style={{ textShadow: '2px 2px 4px #000000' }}>{data && data.text || defaultText}</h1>
        </div>
    );
};

export default BannerOne;

