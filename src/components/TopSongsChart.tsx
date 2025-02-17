import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, useTheme } from "@mui/material";

interface TopSongsChartProps {
  data: { name: string; streams: number; artist: string }[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { name: string; streams: number; artist: string }; // Corrected type
  }[];
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const theme = useTheme();

  if (active && payload && payload.length > 0 && payload[0]?.payload) {
    const data = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "12px 16px",
          border: "1px solid #ccc",
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          color: theme.palette.text.primary,
        }}
      >
        {data.name && <p>Song: {data.name}</p>}
        {data.artist && <p>Artist: {data.artist}</p>}
        <p>Streams: {data.streams.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

const TopSongsChart: React.FC<TopSongsChartProps> = ({ data }) => {
  const formattedData = useMemo(
    () => data.map((item, index) => ({ ...item, chartIndex: index + 1 })),
    [data]
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Top 5 Streamed Songs
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="chartIndex" />
          <YAxis width={80} />
          <BarTooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="streams" fill="rgb(136, 132, 216)" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export { TopSongsChart };
