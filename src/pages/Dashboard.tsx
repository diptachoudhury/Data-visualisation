import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface DataPoint {
  name: string;
  value: number;
  target: number;
}

interface CardComponentProps {
  title: string;
  description: string;
  value: string;
}

// Info Cards besides chart
const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  value,
}) => {
  return (
    <div className="bg-[#222324] p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
      <div>
        <h3 className="text-gray-400 text-sm font-semibold">{title}</h3>
        <p className="text-gray-500 text-xs mt-1">{description}</p>
      </div>
      <p className="text-white text-2xl font-bold mt-3">{value}</p>
    </div>
  );
};

//Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const target = payload[0].payload.target;
    const percentage = (((value - target) / target) * 100).toFixed(1);

    return (
      <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
        <p className="text-white font-semibold">
          ${(value / 1000).toFixed(1)}k
        </p>
        <p className="text-green-400 text-sm">{percentage}% above target</p>
      </div>
    );
  }
  return null;
};

//Main Chart
const Dashboard: React.FC = () => {
  const chartData = useSelector((state: RootState) => {
    console.log("Redux state update detected:", state.chart.modifiedData);
    return state.chart.modifiedData;
  });

  console.log("Current chartData:", chartData);

  return (
    <div className="  p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <h2 className="text-white text-xl font-semibold">Graphs</h2>
      <div></div>
      <div className="hidden lg:block">
        <div className=" flex justify-between">
          <h2 className="text-white text-xl font-semibold">
            Key Performance Indicators
          </h2>
          <button className="bg-[#242424] text-white text-xs px-3 py-2 rounded-sm hover:bg-[#303030] transition-colors">
            Variables +
          </button>
        </div>
      </div>
      {/* Chart Section - takes 2/3 space on large screens */}
      <div className="lg:col-span-2 space-y-6 flex flex-col">
        <div className="bg-[#222324] rounded-2xl shadow-xl p-6 w-full border border-[#525252] h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 text-xs hover:bg-gray-600 transition-colors">
              <span>Unsatisfied Demand %</span>
              <ChevronDown size={16} />
            </button>
          </div>
          {/* Responsive container for the chart to handle resizing */}
          <ResponsiveContainer width="100%" height="100%" className="min-h-96">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#343434" />
              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
                tickLine={false}
              />
              <YAxis
                axisLine={{ stroke: "#4B5563" }}
                tick={{ fill: "#9CA3AF" }}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#C8E972",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              {chartData.map((entry: DataPoint, index: number) => (
                <ReferenceLine
                  key={`ref-${index}`}
                  x={entry.name}
                  stroke=""
                  strokeDasharray="3 3"
                />
              ))}

              <Line
                type="linear"
                dataKey="value"
                stroke="#C8E972"
                strokeWidth={2}
                dot={{ fill: "#C8E972", r: 5, strokeWidth: 2, stroke: "#000" }}
                activeDot={{
                  r: 5,
                  fill: "#00000",
                  stroke: "#C8E972",
                  strokeWidth: 1.5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div>
        <div className="lg:col-span-1 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full lg:grid-rows-2">
          <CardComponent
            title="Infrastructure Units"
            description="Current infrastructure capacity and utilization metrics."
            value="€421.07"
          />
          <CardComponent
            title="Charging Growth"
            description="Monthly growth rate of charging station usage."
            value="21.9%"
          />
          <CardComponent
            title="Localization Change"
            description="Regional adoption rates and geographic distribution."
            value="7.03%"
          />
          <CardComponent
            title="Fleet Growth"
            description="Quarterly expansion of operational vehicle fleet."
            value="50.00K"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
  