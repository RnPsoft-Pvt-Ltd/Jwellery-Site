
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { date: "Aug 31", value: 0 },
  { date: "Sep 30", value: 0 },
  { date: "Oct 31", value: 0 },
  { date: "Nov 30", value: 0 },
  { date: "Dec 31", value: 0 },
  { date: "Jan 31", value: 0 },
];

export default function Dashboard() {
  return (
    <div className="px-60 py-14 ml-40 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Statistics Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Sale Statistics</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded-md">Daily</button>
              <button className="px-3 py-1 text-sm border rounded-md">Weekly</button>
              <button className="px-3 py-1 text-sm border rounded-md">Monthly</button>
            </div>
          </div>
          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 4]} />
                <Line type="monotone" dataKey="value" stroke="#94e2cd" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lifetime Sales Card */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold">Lifetime Sales</h2>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                  <span>0 orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                  <span>$0.00 lifetime sale</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#94e2cd]" />
                  <span>0% of orders completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#ffcdd2]" />
                  <span>0% of orders cancelled</span>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative h-40 w-40 mx-auto">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="fill-none stroke-[#94e2cd]" strokeWidth="10" cx="50" cy="50" r="45" />
                  <text x="50" y="50" className="text-xs" textAnchor="middle" dy=".3em" fill="currentColor">
                    100%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Best Sellers</h2>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            All products
          </a>
        </div>
        <p className="text-gray-500 mt-2">Looks like you just started. No bestsellers yet.</p>
      </div>
    </div>
  );
}


