import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts";
import { dashboardTicketSales } from "../../../api/admin";
import { useQuery } from "@tanstack/react-query";


const DashboardPart2 = () => {
    const [year, setYear] = useState('2023');

    const { refetch, isLoading, data: dashboardData } = useQuery({
        queryKey: ["dashboardTicketData", year],
        queryFn: dashboardTicketSales,
    });

    useEffect(() => {
        if (year) refetch();
    }, [year, refetch]);

    const length = 12;
    let ticketArr = Array(length).fill(0);
    let years = ['2023'];

    if (dashboardData && dashboardData.data && !isLoading) {
        ticketArr = dashboardData.data.count;
        years = dashboardData.data.years;
    }

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = months.map((month, index) => ({
        name: month,
        Count: ticketArr ? ticketArr[index] : 0,
    }));

    return (
        <div className=" bg-white flex flex-col items-center p-10 bg-opacity-60 hover:bg-opacity-100 rounded-lg w-fit xl:w-full shadow hover:shadow-lg transition-all duration-300 transform mt-16">
            <div className="w-full">
                <h1 className="text-center mb-5 text-xl font-semibold text-gray-700">Ticket Sales Statistics - {year}</h1>
                <div className='flex gap-4 mb-5 '>
                    <select value={year} onChange={(e) => setYear(e.target.value)} className=' border w-full focus:outline-none shadow py-2 px-4 rounded text-center'>
                        {years.map((year: string, i) => (
                            <option value={year} key={i}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="xl:hidden">
                <BarChart width={700} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Count" fill="#8884d8" />
                </BarChart>
            </div>
            <div className="hidden xl:block">
                <BarChart width={1100} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Count" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default DashboardPart2;
