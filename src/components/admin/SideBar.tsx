import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { GiSoccerBall } from "react-icons/gi";
import { RiCoupon3Line } from "react-icons/ri";
import { BsTicketPerforated } from "react-icons/bs";
import { MdOutlineStadium } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../api/admin";
import { adminLogout } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const SideBar = () => {
    const menus = [
        { name: "Dashboard", link: "#", icon: MdOutlineDashboard },
        { name: "Users", link: "/admin/users", icon: AiOutlineUser },
        { name: "Clubs", link: "/admin/clubs", icon: GiSoccerBall },
        { name: "Coupons", link: "#", icon: RiCoupon3Line, margin: true },
        { name: "Tickets", link: "#", icon: BsTicketPerforated },
        { name: "Stadium", link: "/admin/stadium", icon: MdOutlineStadium },
        { name: "Logout", link: "#", icon: BiLogOutCircle, margin: true },
    ];
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const response = await logoutAdmin();
        if (response) {
            toast.success(response.data.message);
            dispatch(adminLogout());
            navigate('/admin/login');
        }
    };
    
    return (

        <div
            className={`bg-[#282828] min-h-screen ${open ? "w-72" : "w-16"
                } duration-500  text-gray-100 px-4 `}
        >
            <div className="py-3 flex justify-end">
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu, i) => (
                    menu.name === "Logout" ? (
                        <React.Fragment key={i}>
                            <button
                                onClick={logoutHandler}
                                className={` ${menu?.margin && "mt-5"
                                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-700 hover:bg-opacity-60 rounded-md`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                >
                                    {menu?.name}
                                </h2>
                            </button>
                        </React.Fragment>
                    ) :
                        (<React.Fragment key={i}>
                            <Link
                                to={menu?.link}
                                key={i}
                                className={` ${menu?.margin && "mt-5"
                                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-700 hover:bg-opacity-60 rounded-md`}
                            >
                                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        }`}
                                >
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                        </React.Fragment>)
                ))}
            </div>
        </div>

    );
};

export default SideBar;