import { Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function UserGrowthChart({ data }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        User Growth
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalUsers"
            stroke="#8884d8"
            name="Total Users"
          />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#82ca9d"
            name="Active Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default UserGrowthChart;
