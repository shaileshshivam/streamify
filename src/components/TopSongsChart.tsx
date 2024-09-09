import { Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <p>{`Song: ${data.name}`}</p>
        <p>{`Streams: ${data.streams}`}</p>
      </div>
    );
  }
  return null;
};

function TopSongsChart({ data }) {
  const formattedData = data.map((item, index) => ({
    ...item,
    chartIndex: index + 1,
  }));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Top 5 Streamed Songs
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="chartIndex" />
          <YAxis width={80} />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
          <Legend />
          <Bar dataKey="streams" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default TopSongsChart;
