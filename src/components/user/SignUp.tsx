import formImage from '../../assets/form-image.webp';
const SignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">
            <div
                className="container max-w-md mx-auto xl:max-w-3xl  flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                <div className="relative hidden xl:block xl:w-1/2 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div>
                <div className="w-full xl:w-1/2 p-8  ">
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
                        <div className="flex w-full mt-8">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="button"
                            >
                                Sign in
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
