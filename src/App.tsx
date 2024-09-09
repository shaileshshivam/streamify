import { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import KeyMetrics from "./components/KeyMetrics.tsx";
import UserGrowthChart from "./components/UserGrowthChart.tsx";
import RevenueDistribution from "./components/RevenueDistribution.tsx";
import TopSongsChart from "./components/TopSongsChart.tsx";
import DataTable from "./components/DataTable.tsx";
import MyHeader from "./components/Header.tsx";
import { sampleData } from "./sampleData.ts";

function App() {
  const [data] = useState(sampleData);
  const [revenueSourceFilter, setRevenueSourceFilter] = useState<string | null>(
    null
  );

  const handleRevenueSourceClick = (source: string | null) => {
    setRevenueSourceFilter((prevFilter) =>
      prevFilter === source ? null : source
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MyHeader />
      <KeyMetrics
        totalUsers={data.totalUsers}
        activeUsers={data.activeUsers}
        totalStreams={data.totalStreams}
        revenue={data.revenue}
        topArtist={data.topArtist}
      />

      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <UserGrowthChart data={data.userGrowth} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <RevenueDistribution
              data={data.revenueDistribution}
              onSegmentClick={handleRevenueSourceClick}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 4 }}>
        <TopSongsChart data={data.topSongs} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <DataTable
          data={data.recentStreams}
          revenueSourceFilter={revenueSourceFilter}
        />
      </Paper>
    </Container>
  );
}

export default App;
