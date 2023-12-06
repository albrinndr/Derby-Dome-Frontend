import { CartesianGrid, XAxis, YAxis, AreaChart, Area, Tooltip, PieChart, Pie, Legend, Cell } from 'recharts';
import { BsGraphDown, BsGraphUpArrow, BsPeopleFill } from "react-icons/bs";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { clubDashboard, clubDashboard2Content } from '../../../api/club';
import MatchTicketStats from './MatchTicketStats';
import MatchTicketSalesSkeleton from './MatchTicketSalesSkeleton';

interface Fixture {
    _id: string;
    clubId: { name: string; };
    awayTeam: string;
    date: string;
    price: string;
}


const Dashboard = () => {
    const [year, setYear] = useState('2023');
    const { refetch, isLoading, data: dashboardData } = useQuery({
        queryKey: ["bookingData", year],
        queryFn: clubDashboard,
    });

    const { isLoading: otherLoading, data: dashboardData2 } = useQuery({ queryKey: ['dashboard2'], queryFn: clubDashboard2Content });

    useEffect(() => {
        if (year) refetch();
    }, [year, refetch]);


    const length = 12;
    let profitArr = Array(length).fill(0);
    let expenseArr = Array(length).fill(0);
    let years = ['2023'];

    let totalExpense = 0;
    let totalSales = 0;
    if (dashboardData && dashboardData.data && !isLoading) {
        profitArr = dashboardData.data.profit;
        expenseArr = dashboardData.data.exp;
        years = dashboardData.data.years;

        totalExpense = dashboardData.data.exp.reduce((acc: number, curr: number) => acc += curr, 0);
        totalSales = dashboardData.data.profit.reduce((acc: number, curr: number) => acc += curr, 0);
    }

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = months.map((month, index) => ({
        name: month,
        Profit: profitArr ? profitArr[index] : 0,
        Expense: expenseArr ? expenseArr[index] : 0
    }));

    //second set dashboard data

    const data2 = [
        { category: 'Economy', value: 1 },
        { category: 'Premium', value: 1 },
        { category: 'VIP', value: 1 },
    ];

    let followersCount = 0;

    if (dashboardData2 && dashboardData2.data && !otherLoading) {
        data2[0].value = dashboardData2.data.sectionCount.economy;
        data2[1].value = dashboardData2.data.sectionCount.premium;
        data2[2].value = dashboardData2.data.sectionCount.vip;

        followersCount = dashboardData2.data.followers ? dashboardData2.data.followers : 0;
    }


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


    //fixtures 
    let fixtureSales: { [key: string]: number; } = {};
    let fixtures: Fixture[] = [];
    if (dashboardData2 && dashboardData2.data && !otherLoading) {
        fixtureSales = dashboardData2.data.fixtureSales;
        fixtures = dashboardData2.data.fixtures;
    }

    return (
        <div>
            <div className='bg-white shadow p-5 rounded-lg'>
                <div className='xl:px-64'>
                    <div className='flex justify-between gap-16 md:gap-20 mb-10'>
                        <div className='bg-white shadow-lg py-4 px-10 w-fit rounded'>
                            <h1 className='text-xl font-semibold flex gap-3 justify-between items-center text-orange-700'><span>Expense</span><BsGraphDown /></h1>
                            <div className='mt-2 text-center'>
                                <h1 className='text-xl font-semibold text-gray-700'>₹ {totalExpense}</h1>
                            </div>
                        </div>
                        <div className='bg-white shadow-lg py-4 px-10 w-fit rounded'>
                            <h1 className='text-xl font-semibold flex gap-3 justify-between items-center text-green-700'><span>Ticket Sales</span><BsGraphUpArrow /></h1>
                            <div className='mt-2 text-center'>
                                <h1 className='text-xl font-semibold text-gray-700'>₹ {totalSales}</h1>
                            </div>
                        </div>
                        <div className='bg-white shadow-lg py-4 px-10 w-fit rounded'>
                            <h1 className='text-xl font-semibold flex gap-3 justify-between items-center text-blue-700'><span>Followers</span><BsPeopleFill /></h1>
                            <div className='mt-2 text-center'>
                                <h1 className='text-xl font-semibold text-gray-700'>{followersCount}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='xl:flex gap-10 justify-between w-full  px-5'>
                    <div className=''>
                        <h1 className='text-xl text-center mb-3'>Expense - Profit Statistics</h1>
                        <div className='flex gap-4 mb-5'>
                            <select value={year} onChange={(e) => setYear(e.target.value)} className=' border w-full focus:outline-none shadow py-2 px-4 rounded text-center'>
                                {years.map((year: string, i) => (
                                    <option value={year} key={i}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className=''>
                            <AreaChart width={700} height={250} data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="2 2" />
                                <Tooltip />
                                <Area type="monotone" dataKey="Expense" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                <Area type="monotone" dataKey="Profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </div>
                    </div>
                    <div className='mt-10 xl:mt-3'>
                        <div>
                            <h1 className='text-xl text-center -mb-4'>Seats Sales</h1>
                        </div>
                        <div className='flex justify-center'>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data2}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {
                                        data2.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Pie>
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white shadow p-5 rounded-lg mt-14'>
                <div className='text-center'>
                    <h1 className='text-xl font-semibold'>Upcoming Match Statistics</h1>
                </div>
                {!otherLoading ? <>
                    {fixtures.length > 0 ?
                        <div>
                            {
                                fixtures.map((fixture: Fixture) => (
                                    <MatchTicketStats key={fixture._id}
                                        homeTeam={fixture.clubId.name}
                                        awayTeam={fixture.awayTeam}
                                        date={fixture.date}
                                        price={fixture.price}
                                        ticketProfit={fixtureSales[fixture._id]}
                                    />
                                ))
                            }

                        </div>
                        :
                        <div className='mt-8 border p-3 text-center px-10 gap-5'>
                            <h1>No fixtures available</h1>
                        </div>
                    }
                </>
                    :
                    <div>
                        <MatchTicketSalesSkeleton />
                        <MatchTicketSalesSkeleton />
                        <MatchTicketSalesSkeleton />
                    </div>
                }

            </div>
        </div>
    );
};

export default Dashboard;
