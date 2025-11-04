import { Grid } from "@mui/material";
import KpiCard from "./KpiCard";
import type { Gasto } from "../../types/types";

interface ExpensesKpiContainerProps {
  gastos: Gasto[];
}

export default function ExpensesKpiContainer({
  gastos,
}: ExpensesKpiContainerProps) {
  const totalGastos = gastos.reduce((acc, g) => acc + g.monto, 0);
  const cantidadGastos = gastos.length;
  const promedioGasto = cantidadGastos > 0 ? totalGastos / cantidadGastos : 0;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
         <KpiCard
          titulo="Total Gastos"
          valor={totalGastos}
          color="error.main"
          tipo_valor="monto"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          titulo="Cantidad de Gastos"
          valor={cantidadGastos}
          color="error.main"
          tipo_valor="unidad"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          titulo="Promedio por Gasto"
          valor={promedioGasto}
          color="error.main"
          tipo_valor="monto"
        />
      </Grid>
    </Grid>
  );
}
