import { Paper, Typography } from "@mui/material";
import type { KpiCardProps } from "../../types/types";


import type { SxProps, Theme } from "@mui/material";

const cardStyle: SxProps<Theme> = {
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
  color: (theme) => theme.palette.text.primary,
};

const KpiCard = ({ titulo, valor, color = "primary" }: KpiCardProps) => {
  return (
    <Paper sx={cardStyle}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {titulo}
      </Typography>
      <Typography component="p" variant="h4" color={color}>
        ${valor.toLocaleString("es-AR")}
      </Typography>
    </Paper>
  );
};

export default KpiCard;
