import { useTheme, Paper, Box, Typography } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { CHART_COLORS } from "../theme";

interface RevenueDistributionProps {
  data: { id: string; label: string; value: number; color?: string }[];
}

export const RevenueDistribution: React.FC<RevenueDistributionProps> = ({
  data,
}) => {
  const theme = useTheme();

  const customColors = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.tertiary,
    CHART_COLORS.quaternary,
  ];

  const formatValue = (value: number) => `$${(value / 1000000).toFixed(1)}M`;

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        width: "100%",
        position: "relative",
        overflow: "hidden",

        backgroundColor: "#D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "#424242",
            fontWeight: 600,
            letterSpacing: "0.5px",
            mb: 3,
          }}
        >
          Revenue Distribution
        </Typography>
        <Box sx={{ height: "252px" }}>
          <ResponsivePie
            data={data}
            colors={customColors}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.6}
            padAngle={1.5}
            cornerRadius={8}
            activeOuterRadiusOffset={10}
            borderWidth={0}
            enableArcLinkLabels={true}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={{
              from: "color",
              modifiers: [["brighter", 3]],
            }}
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: "color", modifiers: [["brighter", 3]] }}
            arcLinkLabelsDiagonalLength={15}
            arcLinkLabelsStraightLength={15}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
            valueFormat={formatValue}
            motionConfig="gentle"
            transitionMode="pushOut"
            legends={[
              {
                anchor: "left",
                direction: "column",
                justify: false,
                translateX: -20,
                translateY: 80,
                itemsSpacing: 10,
                itemWidth: 85,
                itemHeight: 10,
                itemTextColor: "#424242",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: { itemTextColor: CHART_COLORS.primary },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    </Paper>
  );
};
