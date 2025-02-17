import { useTheme, Box, Grid, Typography } from "@mui/material";

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.primary.light})`,
        color: "white",
        borderRadius: "12px",
        mb: 6,
        mt: 2,
        py: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Grid container justifyContent="flex-start">
        <Grid item>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 500, lineHeight: 1.2, color: "white", p: 2 }}
          >
            Streamify Analytics Dashboard
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
