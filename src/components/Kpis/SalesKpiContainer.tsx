import { Grid } from "@mui/material";
import KpiCard from "./KpiCard";
import type { Ingreso } from "../../types/types";

interface SalesKpiContainerProps {
  ingresos: Ingreso[];
  marginTop?: boolean;
}

export default function SalesKpiContainer({
  ingresos,
  marginTop,
}: SalesKpiContainerProps) {
  const totalVentas = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
  const cantidadVentas = ingresos.length;
  const promedioVenta = cantidadVentas > 0 ? totalVentas / cantidadVentas : 0;

  return (
    <Grid container spacing={3} sx={{ marginTop: marginTop ? 4 : 0 }}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          titulo="Total Ventas"
          valor={totalVentas}
          color="success.main"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          titulo="Cantidad de Ventas"
          valor={cantidadVentas}
          color="primary.main"
          tipo_valor="unidad"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          titulo="Promedio por Venta"
          valor={promedioVenta}
          color="info.main"
        />
      </Grid>
    </Grid>
  );
}
