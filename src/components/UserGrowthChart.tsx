import { useTheme, Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface UserGrowthChartProps {
  data: { month: string; totalUsers: number; activeUsers: number }[];
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
      <Typography variant="h6" gutterBottom>
        User Growth
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 16, right: 24, bottom: 0, left: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#323232" />
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={{ fontSize: 12 }}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={{ fontSize: 12 }}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en").format(Number(value))
            }
          />
          <LineTooltip
            formatter={(value) =>
              new Intl.NumberFormat("en").format(Number(value))
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalUsers"
            stroke={theme.palette.primary.main}
            name="Total Users"
            dot={false}
            strokeWidth={2.5}
          />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#f50057"
            name="Active Users"
            dot={false}
            strokeWidth={2.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};
