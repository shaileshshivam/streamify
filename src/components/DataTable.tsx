import { useTheme, Paper, Typography, TextField, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowId,
} from "@mui/x-data-grid";
import React from "react";

interface DataTableProps<T extends {}> {
  data: T[];
  columns: GridColDef[];
  rowIdField: keyof T;
  title?: string;
}

export const DataTable: React.FC<DataTableProps<any>> = ({
  data,
  title = "Data Table",
  columns,
  rowIdField,
}) => {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
  const [searchText, setSearchText] = React.useState("");
  const theme = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    const newFilterModel: GridFilterModel = {
      items: text
        ? columns
            .filter((col) => col.field && col.headerName)
            .map((col) => ({
              id: col.field as GridRowId,
              field: col.field,
              operator: "contains",
              value: text,
            }))
        : [],
    };
    setFilterModel(newFilterModel);
  };

  return (
    <Paper
      style={{ borderRadius: "0.5rem", padding: "1rem", marginBlock: "2rem" }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={handleSearchChange}
        sx={{
          mb: 2,

          "& .MuiOutlinedInput-root": {
            borderRadius: theme.shape.borderRadius,

            "&:hover fieldset": {
              borderColor: theme.palette.primary.light,
            },
          },
        }}
      />
      <Box width="100%">
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row[rowIdField] as string}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          sx={{
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[2],
          }}
        />
      </Box>
    </Paper>
  );
};
