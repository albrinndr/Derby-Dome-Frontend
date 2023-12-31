import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { signUp } from '../../api/user';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const G_PASSWORD = import.meta.env.VITE_GOOGLE_PASSWORD


interface OTP {
    otpSubmit: () => void;
}

interface RootState {
    auth: {
        uLoggedIn: boolean;
        cLoggedIn: boolean;
    };
}

const SignUp: React.FC<OTP> = ({ otpSubmit }) => {
    const { uLoggedIn, cLoggedIn } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [goToUser, setGoToUser] = useState(false);


    useEffect(() => {
        if (uLoggedIn) {
            navigate('/');
        } else if (cLoggedIn) {
            navigate('/club/profile');
        }
    }, [navigate, uLoggedIn, cLoggedIn]);

    useEffect(() => {
        if (goToUser) navigate('/club/signup');
    }, [goToUser, navigate]);

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
        if (name.trim().length < 1 || !name.match(/^[a-zA-Z ]{2,30}$/)) {
            toast.error('Enter a valid name');
            return;
        } else if (email.trim().length < 1) {
            toast.error('Enter a valid email');
            return;
        } else if (phone.trim().length < 1 || !phone.match(/^[6-9]\d{9}$/)) {
            toast.error('Enter a valid phone no.');
            return;
        } else if (password.trim().length < 5) {
            toast.error('Enter a valid password');
            return;
        } else if (confirmPassword !== password) {
            toast.error('Passwords does not match');
            return;
        }
        const res = await signUp({ name, email, phone, password });
        if (res) {
            otpSubmit();
            toast.success(res?.data.message);
        }
    };

    const gSignup = async (res: CredentialResponse) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = jwtDecode(res.credential as string);
        const data = {
            name: result.name,
            email: result.email,
            password: G_PASSWORD,
            isGoogle: true,
            profilePic:result.picture
        };
        const response = await signUp(data);
        if (response) {
            toast.success(response.data.message);
            navigate('/login');
        }
    };

    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };


    return (
        <div style={divStyle} className="min-h-screen pb-10 flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">

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
                    <div className='flex justify-end'>
                        <select name="" id="" onChange={() => setGoToUser(true)} className='rounded p-1' defaultValue="User">
                            <option value="User">User</option>
                            <option value="Club">Club</option>
                        </select>
                    </div>
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
                            <span className='text-xs text-gray-900'>Min length 5 characters</span>
                        </div>
                        <div className="mt-6 mb-4">

                            <input
                                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={inputHandler}

                            />

                        </div>
                        <div className="flex w-full mt-8 mb-3">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </div>
                        <div className='flex justify-center '>
                            <GoogleLogin onSuccess={credentialResponse => { gSignup(credentialResponse); }} onError={() => { console.log('Login Failed'); }} />

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
