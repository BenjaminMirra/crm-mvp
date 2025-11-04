
import { Typography, Stack } from "@mui/material";
import { useData } from "../context/DataProvider";
import ExpensesKpiContainer from "../components/Kpis/ExpensesKpiContainer";
import ExpensesChartContainer from "../components/Charts/ExpensesChartContainer";

export default function ExpensesView() {
  const { loading, error, gastosFiltrados, selectedAnios, selectedMeses } = useData();
  return (
    <>
      {loading && <Typography>Cargando datos...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && (
        <Stack
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            boxSizing: "border-box",
            gap: 2,
            flex: 1,
            mx: "auto",
            px: { xs: 4, sm: 6, md: 6, lg: 10 },
            pt: (selectedAnios.length > 0 || selectedMeses.length > 0) ? 4 : 2,
            width: "100%",
          }}
        >
          <ExpensesKpiContainer gastos={gastosFiltrados} />
          <ExpensesChartContainer gastos={gastosFiltrados} />
        </Stack>
      )}
    </>
  );
}
