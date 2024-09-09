import { Divider, Grid, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

function KeyMetrics({
  totalUsers,
  activeUsers,
  totalStreams,
  revenue,
  topArtist,
}) {
  return (
    <Grid container spacing={3}>
      <MetricCard
        title="Total Users"
        value={totalUsers.toLocaleString()}
        icon={<PeopleIcon sx={{ fontSize: 30, color: "primary.main" }} />}
      />
      <MetricCard
        title="Active Users"
        value={activeUsers.toLocaleString()}
        icon={<TrendingUpIcon sx={{ fontSize: 30, color: "success.main" }} />}
      />
      <MetricCard
        title="Total Streams"
        value={totalStreams.toLocaleString()}
        icon={<AudiotrackIcon sx={{ fontSize: 30, color: "info.main" }} />}
      />
      <MetricCard
        title="Revenue"
        value={`$${revenue.toLocaleString()}`}
        icon={<AttachMoneyIcon sx={{ fontSize: 30, color: "warning.main" }} />}
      />
      <MetricCard
        title="Top Artist"
        value={topArtist}
        icon={<StarIcon sx={{ fontSize: 30, color: "primary.main" }} />}
      />
    </Grid>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2.4}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: 140,
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon}
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{ ml: 1.5, wordBreak: "break-word", fontWeight: 600 }}
          >
            {title}
          </Typography>
        </div>
        <Divider sx={{ my: 2 }} />
        <div style={{ marginTop: "auto" }}>
          <Typography
            component="p"
            variant="h4"
            sx={{ fontWeight: 500, wordBreak: "break-word" }}
          >
            {value}
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
}

export default KeyMetrics;
