import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';

const SignUp = () => {
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };
    return (
        <div style={divStyle} className="min-h-screen flex  items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">
            <div
                className="container max-w-md mx-auto  xl:max-w-3xl mt-24 flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                <div className="relative hidden xl:block xl:w-1/2 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div>
                <div className="w-full  xl:w-1/2 p-8  ">
                    <form method="post" action="#" >
                        <h1 className=" text-2xl font-bold">Create a new account</h1>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="email"
                                type="text"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="phone"
                                type="number"
                                placeholder="Enter your phone no."
                            />
                        </div>
                        <div className="mb-4 mt-6">

                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="mb-6 mt-6">

                            <input
                                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="password"
                                type="password"
                                placeholder="Confirm password"
                            />

                        </div>
                        <div className="mb-6 mt-6 relative">
                            <input
                                className="hidden"
                                id="image"
                                type="file"
                            />
                            <label
                                htmlFor="image"
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <span className='text-gray-500 text-sm'>Upload Your Logo</span>
                            </label>
                        </div>

                        <div className="flex w-full mt-8">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="button"
                            >
                                Sign up
                            </button>
                        </div>
                        <div className='text-center m-2'>
                            <span className="text-gray-700 text-sm">
                                Already a member?
                            </span>
                            <span className="text-gray-700 text-sm font-semibold">
                                Log in!
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
