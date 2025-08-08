import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 300 },
  { name: "Page C", value: 200 },
];

const DashboardPage = () => {
  return (
    <Card title="Line Chart" style={{ width: '100%' }}>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#c3423d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DashboardPage;
