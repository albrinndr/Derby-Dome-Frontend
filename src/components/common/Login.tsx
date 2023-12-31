import { Link, useNavigate } from 'react-router-dom';
import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { login } from '../../api/user';
import { useSelector, useDispatch } from 'react-redux';
import { setClubLogin, setLogin } from '../../store/slices/authSlice';
import { clubLogin } from '../../api/club';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useMutation } from '@tanstack/react-query';
const G_PASSWORD = import.meta.env.VITE_GOOGLE_PASSWORD;


interface UserType {
    type?: string;
}

interface RootState {
    auth: {
        uLoggedIn: boolean;
        cLoggedIn: boolean;
    };
}

const Login: React.FC<UserType> = ({ type }) => {
    const [user, setUser] = useState(type);
    const changeUserType = (val: string) => {
        setUser(val);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { uLoggedIn } = useSelector((state: RootState) => state.auth);
    const { cLoggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (uLoggedIn) {
            navigate('/');
        } else if (cLoggedIn) {
            navigate('/club');
        }
    }, [navigate, uLoggedIn, cLoggedIn]);


    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const { status: userLoginStatus, mutate: userLoginMutate } = useMutation({
        mutationFn: login,
        onSuccess: ((response) => {
            if (response) {
                navigate('/');
                const data = {
                    id: response.data.message._id,
                    name: response.data.message.name,
                    profilePic: response.data.message.profilePic,
                    wallet: response.data.message.wallet
                };
                dispatch(setLogin(data));
            }
        })
    });

    const { status: clubLoginStatus, mutate: clubLoginMutate } = useMutation({
        mutationFn: clubLogin,
        onSuccess: ((response) => {
            if (response) {
                navigate('/club/profile');
                const data = {
                    name: response.data.club.name,
                    image: response.data.club.image,
                    address: response.data.club.address,
                    description: response.data.club.description,
                    bgImg: response.data.club.bgImg
                };
                dispatch(setClubLogin(data));
            }
        })
    });

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            toast.error('Fields cannot be empty!');
            return;
        }
        if (user == 'user') {
            const data = { email, password };
            userLoginMutate(data);
        } else {
            const data = { email, password };
            clubLoginMutate(data);
        }
    };

    const gLogin = async (res: CredentialResponse) => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = jwtDecode(res.credential as string);
        const data = {
            email: result.email,
            password: G_PASSWORD,
        };
        userLoginMutate(data)
    };

    const userBtn = user == 'club' ? 'bg-gray-300 hover:bg-gray-200' : 'bg-gray-400';
    const clubBtn = user == 'user' ? 'bg-gray-300 hover:bg-gray-200' : 'bg-gray-400';
    const signUpBtn = user == 'club' ? '/club/signup' : '/signup';
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };
    return (
        <div style={divStyle} className="min-h-screen flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">

            <div
                className="container mt-10 max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                <div className="relative hidden xl:block xl:w-1/2 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div>

                <div className="w-full xl:w-1/2 p-8  ">
                    <div className='flex justify-center mb-6'>
                        <button onClick={() => changeUserType('user')} className={`text-gray-800 font-bold py-2 px-4 rounded-l ${userBtn}`}>
                            User
                        </button>
                        <button onClick={() => changeUserType('club')} className={`text-gray-800 font-bold py-2 px-4 rounded-r ${clubBtn}`}>
                            Club
                        </button>
                    </div>
                    <form onSubmit={submitHandler} >
                        <h1 className=" text-2xl font-bold">Sign in to your account</h1>

                        <div className="mb-4 mt-6">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="email"
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className="mb-6 mt-6">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                id="password"
                                type="password"
                                placeholder="Your password"
                                value={password}
                                onChange={inputHandler}
                            />
                            <Link to={user == "user" ? '/forgotPassword' : '/club/forgotPassword'}
                                className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="flex w-full mt-8">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div></form>
                    {user == 'user' &&
                        <div className='flex justify-center mt-3'>
                            <GoogleLogin onSuccess={credentialResponse => { gLogin(credentialResponse); }} onError={() => { console.log('Login Failed'); }} />

                        </div>
                    }

                    <div className='text-center m-2'>
                        <span className="text-gray-600 text-sm">
                            Not a member?
                        </span>
                        <Link to={signUpBtn} className="text-gray-700 text-sm font-semibold">
                            Join now!
                        </Link>
                    </div>

                </div>
            </div>
            {(clubLoginStatus==='pending' || userLoginStatus==='pending') && <Loader />}
        </div>
    );
};

export default Login;
