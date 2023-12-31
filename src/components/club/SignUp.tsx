import { Link, useNavigate } from 'react-router-dom';
// import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { clubSignUp } from '../../api/club';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

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
    const [goToUser, setGoToUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (cLoggedIn) {
            navigate('/club/profile');
        } else if (uLoggedIn) {
            navigate('/');

        }
    }, [navigate, cLoggedIn, uLoggedIn]);

    useEffect(() => {
        if (goToUser) navigate('/signup');
    }, [goToUser, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactPerson: '',
        phone: '',
        address: '',
        description: '',
        password: '',
        confirmPassword: ''
    });

    const [image, setImage] = useState<File | null>(null);

    const { name, email, phone, password, contactPerson, confirmPassword, address, description } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        } else if (!image) {
            toast.error('Please upload club logo');
            return;
        }

        const clubData = new FormData();
        clubData.append("name", name);
        clubData.append("email", email);
        clubData.append("phone", phone);
        clubData.append("password", password);
        clubData.append("contactPerson", contactPerson);
        clubData.append("description", description);
        clubData.append("address", address);

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
                className="container max-w-lg mx-auto  xl:max-w-3xl mt-28 flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                {/* <div className="relative hidden xl:block xl:w-1/4 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div> */}

                <div className="w-full   p-8  ">
                    <div className='flex justify-end '>
                        <select name="" id="" onChange={() => setGoToUser(true)} className='rounded p-1' defaultValue="Club">
                            <option value="Club">Club</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <h1 className=" text-2xl font-bold text-center">Create a new club account</h1>
                        <div className='md:flex md:gap-4'>
                            <div className="mb-1 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Club name: </label>
                                <input
                                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="name"
                                    type="text"
                                    placeholder="Enter club name"
                                    value={name}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className="mb-1 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Contact Person: </label>
                                <input
                                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="contactPerson"
                                    type="text"
                                    placeholder="Enter name"
                                    value={contactPerson}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>
                        <div className='md:flex md:gap-4'>
                            <div className="mb-1 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Contact email: </label>

                                <input
                                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className="mb-1 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Contact no: </label>

                                <input
                                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="phone"
                                    type="number"
                                    placeholder="Enter phone no."
                                    value={phone}
                                    onChange={inputHandler}
                                />
                            </div>
                        </div>

                        <div className="mb-1 mt-6 md:mt-3">
                            <label htmlFor="" className='text-gray-800'>Address:</label>

                            <textarea
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-15"
                                id="address"
                                value={address}
                                onChange={textAreaHandler}
                            ></textarea>
                        </div>
                        <div className="mb-1 mt-6 md:mt-3">
                            <label htmlFor="" className='text-gray-800'>Description</label>

                            <textarea
                                className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-15"
                                id="description"
                                value={description}
                                onChange={textAreaHandler}
                            ></textarea>
                        </div>
                        <div className='md:flex md:gap-4'>
                            <div className="mb-4 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Password</label>

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
                            <div className="mb-6 mt-6 md:mt-3 w-full">
                                <label htmlFor="" className='text-gray-800'>Confirm Password</label>

                                <input
                                    className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={inputHandler}
                                />

                            </div>
                        </div>
                        <div className="mb-6 mt-3 relative">
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
