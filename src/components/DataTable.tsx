import { useState, useEffect } from "react";
import { Typography, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "songName", headerName: "Song Name", flex: 1 },
  { field: "artist", headerName: "Artist", flex: 1 },
  { field: "dateStreamed", headerName: "Date Streamed", flex: 1 },
  { field: "streamCount", headerName: "Stream Count", type: "number", flex: 1 },
  { field: "userId", headerName: "User ID", flex: 1 },
  { field: "revenueSource", headerName: "Revenue Source", flex: 1 },
];

interface DataTableProps {
  data: {
    id: number;
    songName: string;
    artist: string;
    dateStreamed: string;
    streamCount: number;
    userId: string;
    revenueSource: string;
  }[];
  revenueSourceFilter: string | null;
}

function DataTable({ data, revenueSourceFilter }: DataTableProps) {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  useEffect(() => {
    if (revenueSourceFilter) {
      setFilterModel({
        items: [
          {
            id: 1,
            field: "revenueSource",
            operator: "equals",
            value: revenueSourceFilter,
          },
        ],
      });
    } else {
      setFilterModel({ items: [] });
    }
  }, [revenueSourceFilter]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Streams
      </Typography>
      <TextField
        label="Filter by song or artist"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => {
          setFilterModel({
            items: [
              {
                id: 1,
                field: "songName",
                operator: "contains",
                value: e.target.value,
              },
              ...(revenueSourceFilter
                ? [
                    {
                      id: 2,
                      field: "revenueSource",
                      operator: "equals",
                      value: revenueSourceFilter,
                    },
                  ]
                : []),
            ],
          });
        }}
      />
      <div>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) =>
            setFilterModel(newFilterModel)
          }
        />
      </div>
    </>
  );
}

export default DataTable;
