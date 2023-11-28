import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import DashHead from "./DashHead";
import { useEffect, useState } from "react";
import DashboardPart2 from "./DashboardPart2";
import { useQuery } from "@tanstack/react-query";
import { dashboardSales, dashboardChartAndStaticContent } from "../../../api/admin";

const Dashboard = () => {
  const [year, setYear] = useState('2023');

  const { refetch, isLoading, data: dashboardData } = useQuery({
    queryKey: ["dashboardSalesData", year],
    queryFn: dashboardSales,
  });

  const { isLoading: staticIsLoading, data: dashboardStatic } = useQuery({ queryKey: ['dashboardStaticData'], queryFn: dashboardChartAndStaticContent });

  useEffect(() => {
    if (year) refetch();
  }, [year, refetch]);


  //sales data
  const length = 12;
  let salesArr = Array(length).fill(0);
  let years = ['2023'];
  

  if (dashboardData && dashboardData.data && !isLoading) {
    salesArr = dashboardData.data.profits;
    years = dashboardData.data.years;
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const data = months.map((month, index) => ({
    name: month,
    Profit: salesArr ? salesArr[index] : 0,
  }));


  //static Data and  pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const data2 = [
    { category: 'Economy', value: 1 },
    { category: 'Premium', value: 1 },
    { category: 'VIP', value: 1 },
  ];

  //top cards

  let ticketsSold = 0;
  let totalClubs = 0;
  let totalUsers = 0;
  let salesCount = 0;

  if (dashboardStatic && dashboardStatic.data && !staticIsLoading) {
    data2[0].value = dashboardStatic.data.sectionData.economy;
    data2[1].value = dashboardStatic.data.sectionData.premium;
    data2[2].value = dashboardStatic.data.sectionData.vip;

    ticketsSold = dashboardStatic.data.tickets;
    totalClubs = dashboardStatic.data.clubs;
    totalUsers = dashboardStatic.data.tickets;
    salesCount = dashboardStatic.data.totalSales;
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 tracking-widest">WELCOME ADMIN,</h1>
      </div>
      <div className="mt-10">
        <DashHead salesCount={salesCount} ticketsSold={ticketsSold} totalClubs={totalClubs} totalUsers={totalUsers} />
      </div>

      {/* profit chart */}
      <div className="xl:flex gap-10 justify-between bg-white bg-opacity-60 hover:bg-opacity-100 rounded-lg w-fit xl:w-full shadow hover:shadow-lg transition-all duration-300 transform">
        <div className=" pl-3 pr-10 py-10 w-fit">
          <h1 className="text-center mb-5 text-xl font-semibold text-gray-700">Slot Sales Statistics - {year}</h1>
          <div className='flex gap-4 mb-5'>
            <select value={year} onChange={(e) => setYear(e.target.value)} className=' border w-full focus:outline-none shadow py-2 px-4 rounded text-center'>
              {years.map((year: string, i) => (
                <option value={year} key={i}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <LineChart width={730} height={250} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Profit" stroke="#06c43c" />
            </LineChart>
          </div>
        </div>

        <div className=' py-10  '>
          <div>
            <h1 className='text-xl font-semibold text-center -mb-4'>Seats Sales</h1>
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
                  data2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))
                }
              </Pie>
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
      {/* end */}

      <DashboardPart2 />

    </div>
  );
};

export default Dashboard;
