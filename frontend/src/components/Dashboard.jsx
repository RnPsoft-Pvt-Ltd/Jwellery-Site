
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

// const data = [
//   { date: "Aug 31", value: 0 },
//   { date: "Sep 30", value: 0 },
//   { date: "Oct 31", value: 0 },
//   { date: "Nov 30", value: 0 },
//   { date: "Dec 31", value: 0 },
//   { date: "Jan 31", value: 0 },
// ];

// export default function Dashboard() {
//   return (
//     <div className="px-60 py-14 ml-40 space-y-6">
//       <h1 className="text-2xl font-semibold">Dashboard</h1>

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Sales Statistics Card */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <div className="flex flex-row items-center justify-between">
//             <h2 className="text-lg font-semibold">Sale Statistics</h2>
//             <div className="flex space-x-2">
//               <button className="px-3 py-1 text-sm border rounded-md">Daily</button>
//               <button className="px-3 py-1 text-sm border rounded-md">Weekly</button>
//               <button className="px-3 py-1 text-sm border rounded-md">Monthly</button>
//             </div>
//           </div>
//           <div className="h-[200px] w-full mt-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis domain={[0, 4]} />
//                 <Line type="monotone" dataKey="value" stroke="#94e2cd" dot={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Lifetime Sales Card */}
//         <div className="space-y-6">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-lg font-semibold">Lifetime Sales</h2>
//             <div className="space-y-4 mt-4">
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
//                   <span>0 orders</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
//                   <span>$0.00 lifetime sale</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
//                   <span>0% of orders completed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-[#ffcdd2]" />
//                   <span>0% of orders cancelled</span>
//                 </div>
//               </div>

//               {/* Circular Progress */}
//               <div className="relative h-40 w-40 mx-auto">
//                 <svg className="h-full w-full" viewBox="0 0 100 100">
//                   <circle className="fill-none stroke-[#94e2cd]" strokeWidth="10" cx="50" cy="50" r="45" />
//                   <text x="50" y="50" className="text-xs" textAnchor="middle" dy=".3em" fill="currentColor">
//                     100%
//                   </text>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Best Sellers Card */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex flex-row items-center justify-between">
//           <h2 className="text-lg font-semibold">Best Sellers</h2>
//           <a href="#" className="text-sm text-blue-500 hover:underline">
//             All products
//           </a>
//         </div>
//         <p className="text-gray-500 mt-2">Looks like you just started. No bestsellers yet.</p>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [lifetimeSales, setLifetimeSales] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  // Fetch Lifetime Sales
  const fetchLifetimeSales = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/lifetime-sales");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setLifetimeSales(data);
    } catch (error) {
      console.error("Error fetching lifetime sales:", error);
    }
  };

  // Fetch Sales Data (Daily, Weekly, Monthly)
  const fetchSalesData = async (period) => {
    try {
      const urlMap = {
        daily: "http://localhost:5000/v1/salestatistics/sales/daily",
        weekly: "http://localhost:5000/v1/salestatistics/sales/weekly",
        monthly: "http://localhost:5000/v1/salestatistics/sales/monthly",
      };

      const response = await fetch(urlMap[period]);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const key = period === "daily" ? "dailyOrders" : period === "weekly" ? "weeklyOrders" : "monthlyOrders";

      const formattedData = data[key].map((item) => ({
        date: new Date(item.order_date).toLocaleDateString(),
        value: item._count.id,
      }));

      setSalesData(formattedData);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  // Fetch data on component mount & when period changes
  useEffect(() => {
    fetchLifetimeSales();
    fetchSalesData(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Statistics Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Sale Statistics</h2>
            <div className="flex space-x-2">
              {["daily", "weekly", "monthly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 text-sm border rounded-md ${
                    selectedPeriod === period ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="value" stroke="#94e2cd" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lifetime Sales Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold">Lifetime Sales</h2>
          <div className="space-y-4 mt-4">
            {lifetimeSales ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                    <span>{lifetimeSales.totalOrders} orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                    <span>${lifetimeSales.totalSales} lifetime sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                    <span>{lifetimeSales.completedPercentage}% of orders completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#ffcdd2]" />
                    <span>{lifetimeSales.cancelledPercentage}% of orders cancelled</span>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="relative h-40 w-40 mx-auto">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle className="fill-none stroke-[#94e2cd]" strokeWidth="10" cx="50" cy="50" r="45" />
                    <text x="50" y="50" className="text-xs" textAnchor="middle" dy=".3em" fill="currentColor">
                      {lifetimeSales.completedPercentage}%
                    </text>
                  </svg>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Loading lifetime sales...</p>
            )}
          </div>
        </div>

        {/* Best Sellers Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Best Sellers</h2>
            <Link to="/products" className="text-sm text-blue-500 hover:underline">
              All products
            </Link>
          </div>
          <p className="text-gray-500 mt-2">Looks like you just started. No bestsellers yet.</p>
        </div>
      </div>
    </div>
  );
}
