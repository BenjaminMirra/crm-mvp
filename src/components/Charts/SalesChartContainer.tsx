import { Grid } from "@mui/material";
import { useMemo } from "react";
import ChartCard from "./ChartCard";
import FacturacionClienteChart from "./FacturacionClienteChart";
import type { Ingreso } from "../../types/types";

interface SalesChartContainerProps {
  ingresos: Ingreso[];
}

export default function SalesChartContainer({
  ingresos,
}: SalesChartContainerProps) {
  // Facturación por cliente
  const facturacionPorCliente = useMemo(() => {
    const clientes: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      if (!clientes[ingreso.cliente]) clientes[ingreso.cliente] = 0;
      clientes[ingreso.cliente] += ingreso.monto;
    });
    const clientesOrdenados = Object.entries(clientes).sort(
      (a, b) => b[1] - a[1]
    );
    const categories = clientesOrdenados.map(([cliente]) => cliente);
    const data = clientesOrdenados.map(([, monto]) => monto);
    const series = [{ type: "bar" as const, name: "Facturación", data }];
    return { categories, series };
  }, [ingresos]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <ChartCard title="Facturación por Cliente">
          <FacturacionClienteChart
            categories={facturacionPorCliente.categories}
            series={facturacionPorCliente.series}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
}
