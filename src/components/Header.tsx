import { Typography, Grid } from "@mui/material";

const headerTitleStyles = {
  fontWeight: 700,
  lineHeight: 1.2,
};

function MyHeader() {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        p="1rem"
        borderBottom={"1px solid black"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px"}
        mb="3rem"
        borderRadius={"1rem"}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={headerTitleStyles}
          color="#45765f"
        >
          Streamify Analytics Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MyHeader;
