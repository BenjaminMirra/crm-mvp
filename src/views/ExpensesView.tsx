  import { Typography } from "@mui/material";
  import { useData } from "../context/DataProvider";

export default function ExpensesView() {
  const { loading, error } = useData();

  return (
    <>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, px: 4 }}>Gastos</Typography>
      {/* Aquí irán los KPIs y gráficos específicos de gastos usando gastosFiltrados */}
      {loading && <Typography>Cargando datos...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {/* Placeholder */}
      <Typography sx={{ px: 4 }}>Próximamente: Tablero de gastos.</Typography>
    </>
  );
}
