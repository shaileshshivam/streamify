import React, { useMemo } from "react";
import { Container, Grid, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { sampleData } from "./sampleData"; // Ensure this path is correct and type is exported
import { BASE_THEME } from "./theme";
import { Header } from "./components/Header";
import { KeyMetrics } from "./components/KeyMetrics";
import { UserGrowthChart } from "./components/UserGrowthChart";
import { RevenueDistribution } from "./components/RevenueDistribution";
import { DataTable } from "./components/DataTable";
import { TopSongsChart } from "./components/TopSongsChart";

const columnsOne: GridColDef[] = [
  {
    field: "songName",
    headerName: "Song Name",
    flex: 1,
  },
  {
    field: "artist",
    headerName: "Artist",
    flex: 1,
  },
  {
    field: "dateStreamed",
    headerName: "Date Streamed",
    flex: 1,
    type: "string",
  },
  {
    field: "streamCount",
    headerName: "Stream Count",
    type: "number",
    flex: 0.7,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.8,
  },
  {
    field: "revenueSource",
    headerName: "Revenue Source",
    flex: 1,
  },
];

const columnsTwo: GridColDef[] = [
  {
    field: "albumName",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "artist",
    headerName: "Artist",
    flex: 1,
  },
  {
    field: "creationDate",
    headerName: "Creation date",
    flex: 1,
    type: "string",
  },
  {
    field: "streamCount",
    headerName: "Number of listeners",
    type: "number",
    flex: 1,
  },
];

const albumStats = [
  {
    id: "1",
    albumName: "Lavender Haze",
    artist: "Taylor Swift",
    creationDate: "2024-09-08",
    streamCount: 1000,
  },
  {
    id: "2",
    albumName: "Salmon Haze",
    artist: "Some Swift",
    creationDate: "2024-09-08",
    streamCount: 2000,
  },
];

const App: React.FC = () => {
  const [data] = React.useState<typeof sampleData>(sampleData);

  const revenueData = useMemo(() => {
    const subscriptionValue =
      data.revenueDistribution.find((item) => item.source === "Subscriptions")
        ?.value ?? 0;

    const advertisementsValue =
      data.revenueDistribution.find((item) => item.source === "Advertisements")
        ?.value ?? 0;
    const merchandiseValue =
      data.revenueDistribution.find((item) => item.source === "Merchandise")
        ?.value ?? 0;
    const othersValue =
      data.revenue -
        (subscriptionValue + advertisementsValue + merchandiseValue) >
      0
        ? data.revenue -
          (subscriptionValue + advertisementsValue + merchandiseValue)
        : 0;

    return [
      { id: "Subscriptions", label: "Subscriptions", value: subscriptionValue },
      {
        id: "Advertisements",
        label: "Advertisements",
        value: advertisementsValue,
      },
      { id: "Merchandise", label: "Merchandise", value: merchandiseValue },
      { id: "Others", label: "Others", value: othersValue },
    ];
  }, [data]);

  return (
    <ThemeProvider theme={BASE_THEME}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Header />
        <KeyMetrics
          totalUsers={data.totalUsers}
          activeUsers={data.activeUsers}
          totalStreams={data.totalStreams}
          revenue={data.revenue}
          topArtist={data.topArtist}
        />
        <Grid container spacing={3} sx={{ my: 2 }}>
          <Grid item xs={12} md={6}>
            <UserGrowthChart data={data.userGrowth} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RevenueDistribution data={revenueData} />
          </Grid>
        </Grid>
        <Paper sx={{ p: 2, mt: 4 }}>
          <TopSongsChart data={data.topSongs} />
        </Paper>
        <DataTable
          columns={columnsOne}
          data={data.recentStreams}
          rowIdField="id"
          title="Recent Streams"
        />
        <DataTable
          title="Album Stats"
          columns={columnsTwo}
          data={albumStats}
          rowIdField="id"
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
