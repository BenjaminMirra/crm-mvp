import { Paper, Typography, Box } from "@mui/material";
import type { ChartCardProps } from "../../types/types";


const cardStyle = {
  p: 3,
  display: "flex",
  flexDirection: "column",
  borderRadius: "18px",
  border: "1.5px solid #e0e0e0",
  background: "#fff",
  boxShadow: "0 2px 16px 0 rgba(44,62,80,0.10)",
  transition: "box-shadow 0.2s",
  '&:hover': {
    boxShadow: "0 8px 32px 0 rgba(44,62,80,0.18)",
  },
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <Paper sx={cardStyle} elevation={0}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Box sx={{ height: 300, flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};

export default ChartCard;
