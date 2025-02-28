import {
  useTheme,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Popover,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Stack,
  FormControl,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Filter {
  column: GridColDef;
  query: string;
  value: string;
}

interface BasicPopoverProps {
  columns: GridColDef[];
  onFilterAdd: (filter: Filter) => void;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const queryItems = ["contains", "equals", "startsWith", "endsWith"]; // Added more query options

const POPUP_WIDTH = 350;

function BasicPopover({
  columns,
  onFilterAdd,
  open,
  anchorEl,
  onClose,
}: BasicPopoverProps) {
  const [column, setColumn] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("contains");
  const [value, setValue] = React.useState<string>("");

  const handleColumnChange = (event: SelectChangeEvent) => {
    setColumn(event.target.value as string);
  };

  const handleQueryChange = (event: SelectChangeEvent) => {
    setQuery(event.target.value as string);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const addFilter = useCallback(() => {
    if (!column || !query || !value) return;
    const selectedColumn = columns.find(
      (col, index) => index.toString() === column
    );
    if (!selectedColumn) return;

    onFilterAdd({
      column: selectedColumn,
      query: query,
      value: value,
    });

    setColumn("");
    setQuery("contains");
    setValue("");
    onClose();
  }, [column, query, value, columns, onFilterAdd, onClose]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 3, width: POPUP_WIDTH }}>
        <Typography variant="h6" gutterBottom>
          Add Filter
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="column-select-label">Select Column</InputLabel>
          <Select
            labelId="column-select-label"
            id="column-select"
            value={column}
            onChange={handleColumnChange}
            label="Select Column"
            MenuProps={{
              PaperProps: {
                style: {
                  width: POPUP_WIDTH,
                },
              },
            }}
          >
            {columns.map((column, index) => (
              <MenuItem key={column.field} value={index.toString()}>
                {column.headerName} ({column.type || "string"})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="query-select-label">Select Condition</InputLabel>
          <Select
            labelId="query-select-label"
            id="query-select"
            value={query}
            onChange={handleQueryChange}
            label="Select Condition"
            MenuProps={{
              PaperProps: {
                style: {
                  width: POPUP_WIDTH,
                },
              },
            }}
          >
            {queryItems.map((queryType) => (
              <MenuItem key={queryType} value={queryType}>
                {queryType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Value"
          variant="outlined"
          fullWidth
          margin="normal"
          value={value}
          onChange={handleValueChange}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 2 }} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={addFilter}>
            Add Filter
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}

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
  const [searchText, setSearchText] = React.useState("");
  const theme = useTheme();
  const [globalFilters, setGlobalFilters] = useState<Filter[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const isFilterMenuOpen = Boolean(filterAnchorEl);

  const handleFilterAdd = (newFilter: Filter) => {
    setGlobalFilters([...globalFilters, newFilter]);
    handleFilterMenuClose();
  };

  const handleFilterDelete = (filterToDelete: Filter) => {
    setGlobalFilters(
      globalFilters.filter(
        (filter) => filter.column.field !== filterToDelete.column.field
      )
    );
  };

  const filteredData = React.useMemo(() => {
    if (globalFilters.length === 0 && searchText === "") {
      return data;
    }

    let tempFilteredData = [...data];

    if (globalFilters.length > 0) {
      tempFilteredData = tempFilteredData.filter((row) => {
        return globalFilters.every((filter) => {
          const value = String(row[filter.column.field]);

          switch (filter.query) {
            case "contains":
              return value.toLowerCase().includes(filter.value.toLowerCase());
            case "equals":
              return value.toLowerCase() === filter.value.toLowerCase();
            case "startsWith":
              return value.toLowerCase().startsWith(filter.value.toLowerCase());
            case "endsWith":
              return value.toLowerCase().endsWith(filter.value.toLowerCase());
            default:
              return true;
          }
        });
      });
    }

    if (searchText) {
      tempFilteredData = tempFilteredData.filter((row) => {
        return columns.some((col) => {
          if (col.field && col.headerName) {
            const value = String(row[col.field]);
            return value.toLowerCase().includes(searchText.toLowerCase());
          }
          return false;
        });
      });
    }

    return tempFilteredData;
  }, [data, globalFilters, columns, searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Paper
      style={{ borderRadius: "0.5rem", padding: "1rem", marginBlock: "2rem" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleFilterMenuOpen}
        >
          Add Filter
        </Button>
      </Box>

      <BasicPopover
        columns={columns}
        onFilterAdd={handleFilterAdd}
        open={isFilterMenuOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterMenuClose}
      />

      {globalFilters.length > 0 && (
        <Stack direction="row" spacing={1} mt={2}>
          {globalFilters.map((filter) => (
            <Chip
              key={filter.column.field}
              label={`${filter.column.headerName} ${filter.query} "${filter.value}"`}
              onDelete={() => handleFilterDelete(filter)}
              deleteIcon={<ClearIcon />}
            />
          ))}
        </Stack>
      )}

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
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row[rowIdField] as string}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[2],
          }}
          disableColumnFilter
          disableColumnMenu
        />
      </Box>
    </Paper>
  );
};
