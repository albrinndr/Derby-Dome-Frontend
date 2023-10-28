import { ChangeEvent, FormEvent, useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { signUp } from '../../api/user';

interface OTP {
    otpSubmit: () => void;
}

interface RootState {
    auth: {
        uLoggedIn: boolean;
    };
}

const SignUp: React.FC<OTP> = ({ otpSubmit }) => {
    const { uLoggedIn } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (uLoggedIn) {
            navigate(-1);
        }
    }, [navigate, uLoggedIn]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, phone, password, confirmPassword } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        const res = await signUp({ name, email, phone, password });
        if (res) {
            otpSubmit();
            toast.success(res?.data.message);
        }
    };

    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };

    return (
        <div style={divStyle} className="min-h-screen flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">

            <div
                className="container max-w-md mx-auto xl:max-w-3xl mt-24 flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                <div className="relative hidden xl:block xl:w-1/2 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div>
                <div className="w-full xl:w-1/2 p-8  ">
                    <form onSubmit={submitHandler} >
                        <h1 className=" text-2xl font-bold">Create a new account</h1>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="email"
                                type="text"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="mb-4 mt-6">
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="phone"
                                type="number"
                                placeholder="Enter your phone no."
                                value={phone}
                                onChange={inputHandler}

                            />
                        </div>
                        <div className="mb-4 mt-6">

                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={inputHandler}

                            />
                        </div>
                        <div className="mb-6 mt-6">

                            <input
                                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={inputHandler}

                            />

                        </div>
                        <div className="flex w-full mt-8">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </div>
                        <div className='text-center m-2'>
                            <span className="text-gray-700 text-sm">
                                Already a member?
                            </span>
                            <Link to='/login' className="text-gray-700 text-sm font-semibold">
                                Log in!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
