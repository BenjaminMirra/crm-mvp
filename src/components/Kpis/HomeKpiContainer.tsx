import { Grid } from "@mui/material";
import { useMemo } from "react";
import KpiCard from "./KpiCard";
import type { KpiContainerProps } from "../../types/types";

const HomeKpiContainer = ({ marginTop, ingresos, gastos }: KpiContainerProps) => {
  const resumenFinanciero = useMemo(() => {
    const totalIngresos = ingresos.reduce((acc, curr) => acc + curr.monto, 0);
    const totalGastos = gastos.reduce((acc, curr) => acc + curr.monto, 0);
    const gananciaNeta = totalIngresos - totalGastos;
    return { totalIngresos, totalGastos, gananciaNeta };
  }, [ingresos, gastos]);

  return (
    <Grid container spacing={3} sx={{
      marginTop: marginTop ? 4 : 0,
    }}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <KpiCard
          titulo="Ingresos Totales"
          valor={resumenFinanciero.totalIngresos}
          color={
            resumenFinanciero.totalIngresos > 0
              ? "success.main"
              : resumenFinanciero.totalIngresos < 0
              ? "error.main"
              : "primary"
          }
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <KpiCard
          titulo="Gastos Totales"
          valor={resumenFinanciero.totalGastos}
          color={
            resumenFinanciero.totalGastos > 0
              ? "error.main"
              : resumenFinanciero.totalGastos < 0
              ? "success.main"
              : "primary"
          }
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
      >
        <KpiCard
          titulo="Ganancia Neta"
          valor={resumenFinanciero.gananciaNeta}
          color={
            resumenFinanciero.gananciaNeta > 0
              ? "success.main"
              : resumenFinanciero.gananciaNeta < 0
              ? "error.main"
              : "primary"
          }
        />
      </Grid>
    </Grid>
  );
};

export default HomeKpiContainer;
