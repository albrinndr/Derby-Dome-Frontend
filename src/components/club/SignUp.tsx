import { Link ,useNavigate} from 'react-router-dom';
import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { useState, ChangeEvent, FormEvent,useEffect } from 'react';
import { clubSignUp } from '../../api/club';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

interface OTP {
    otpSubmit: () => void;
}

interface RootState {
    auth: {
        cLoggedIn: boolean;
    };
}

const SignUp: React.FC<OTP> = ({ otpSubmit }) => {
    const { cLoggedIn } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (cLoggedIn) {
            navigate(-1);
        }
    }, [navigate, cLoggedIn]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [image, setImage] = useState<File | null>(null);

    const { name, email, phone, password, confirmPassword } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const clubData = new FormData();
        clubData.append("name", name);
        clubData.append("email", email);
        clubData.append("phone", phone);
        clubData.append("password", password);
        if (image) clubData.append("image", image);


        const res = await clubSignUp(clubData);
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
        <div style={divStyle} className="min-h-screen flex pb-10  items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">
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
                    <form onSubmit={submitHandler} encType="multipart/form-data">
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
                                type="email"
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
                        <div className="mb-6 mt-6 relative">
                            <input
                                className="hidden"
                                id="image"
                                type="file"
                                name='file'
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
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
                                <span className='text-gray-500 text-sm'>{image ? image.name : 'Upload Your Logo'}</span>
                            </label>
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
                            <Link to='/club/login' className="text-gray-700 text-sm font-semibold">
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
