import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/StarBorder";

const METRIC_CARD_HEIGHT = 140;

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  const theme = useTheme();
  const [elevation, setElevation] = React.useState(1);

  return (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <Paper
        elevation={elevation}
        onMouseEnter={() => setElevation(4)}
        onMouseLeave={() => setElevation(1)}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: METRIC_CARD_HEIGHT,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "white",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={0.5}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              sx={{
                p: 1,
                color: theme.palette.text.secondary,
              }}
              disableRipple
            >
              {icon}
            </IconButton>

            <Typography
              component="h1"
              variant="overline"
              sx={{
                ml: 1,
                fontWeight: 700,
                color: theme.palette.text.primary,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "0.75rem",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            component="p"
            sx={{
              fontWeight: 500,
              color: theme.palette.text.primary,
              fontSize: "1.5rem",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

interface KeyMetricsProps {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export const KeyMetrics: React.FC<KeyMetricsProps> = ({
  totalUsers,
  activeUsers,
  totalStreams,
  revenue,
  topArtist,
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <MetricCard
        title="Total Users"
        value={totalUsers.toLocaleString()}
        icon={
          <PeopleIcon
            sx={{ fontSize: 32, color: theme.palette.primary.main }}
          />
        }
      />

      <MetricCard
        title="Active Users"
        value={activeUsers.toLocaleString()}
        icon={
          <TrendingUpIcon
            sx={{ fontSize: 32, color: theme.palette.success.main }}
          />
        }
      />
      <MetricCard
        title="Total Streams"
        value={totalStreams.toLocaleString()}
        icon={
          <AudiotrackIcon
            sx={{ fontSize: 32, color: theme.palette.info.main }}
          />
        }
      />

      <MetricCard
        title="Revenue"
        value={`$${revenue.toLocaleString()}`}
        icon={
          <AttachMoneyIcon
            sx={{ fontSize: 32, color: theme.palette.warning.main }}
          />
        }
      />
      <MetricCard
        title="Top Artist"
        value={topArtist}
        icon={<StarIcon sx={{ fontSize: 32, color: "#f50057" }} />}
      />
    </Grid>
  );
};
