import React from 'react';

interface Image {
    banner?: string;
}

const BannerOne: React.FC<Image> = ({ banner }) => {
    const divStyle = {
        backgroundImage: `url(${banner})`,
        height: '90vh', // Adjust the height as required
    };

    return (
        <div className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full" style={divStyle}>
            <h1 className="text-white text-4xl sm:text-6xl px-10 text-center" style={{ textShadow: '2px 2px 4px #000000' }}>Get tickets to top tier football Matches</h1>
        </div>
    );
};

export default BannerOne;

