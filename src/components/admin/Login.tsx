import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import formImage from '../../assets/form-image.webp';
import backgroundImage from '../../assets/stadium-background.webp';
import { adminLogin } from '../../api/admin';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminLogin } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Loader from '../common/Loader';

interface RootState {
    auth: {
        aLoggedIn: boolean;
    };
}

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { aLoggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (aLoggedIn) {
            navigate('/admin/');
        }
    }, [aLoggedIn, navigate]);


    const { email, password } = formData;

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const { status, mutate: adminLoginMutate } = useMutation({
        mutationFn: adminLogin,
        onSuccess: ((res) => {
            if (res) {
                navigate('/admin');
                dispatch(setAdminLogin());
            }
        })
    });

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim().length === 0 || password.trim().length === 0) {
            toast.error('Fields cannot be empty!');
            return;
        }
        adminLoginMutate(formData);
    };
    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: '100%',
    };


    return (
        <div style={divStyle} className="min-h-screen flex items-center justify-center bg-stadium-background bg-cover bg-center backdrop-filter  backdrop-blur-md">

            <div
                className="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden bg-opacity-50"
            >
                <div className="relative hidden xl:block xl:w-1/2 ">
                    <img
                        className=" h-full object-cover"
                        src={formImage}
                        alt="image"
                    />
                </div>

                <div className="w-full xl:w-1/2 p-8  ">

                    <form onSubmit={submitHandler}>
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

                        </div>
                        <div className="flex w-full mt-8">
                            <button
                                className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>


                    </form>
                </div>
            </div>
            {status === 'pending' && <Loader />}
        </div>
    );
};

export default Login;
