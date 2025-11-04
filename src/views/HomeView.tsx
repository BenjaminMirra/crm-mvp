// import FiltrosPeriodo from "../components/FiltrosPeriodo";
import FiltersChips from "../components/FiltersChips";
import HomeKpiContainer from "../components/Kpis/HomeKpiContainer";
import HomeChartContainer from "../components/Charts/HomeChartContainer";
import { Typography, Stack } from "@mui/material";
import { useData } from "../context/DataProvider";

export default function HomeView() {
  const {
    ingresos,
    gastos,
    ingresosFiltrados,
    gastosFiltrados,
    loading,
    error,
    selectedAnios,
    selectedMeses,
    setSelectedAnios,
    setSelectedMeses,
  } = useData();
  
  return (
    <>
      {/* <FiltrosPeriodo
        data={[...ingresos, ...gastos]}
        selectedAnios={selectedAnios}
        selectedMeses={selectedMeses}
        onChangeAnios={setSelectedAnios}
        onChangeMeses={setSelectedMeses}
      /> */}
      {loading && <Typography>Cargando datos...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {(selectedAnios.length > 0 || selectedMeses.length > 0) && (
        <FiltersChips
          selectedAnios={selectedAnios}
          selectedMeses={selectedMeses}
          ingresos={ingresos}
          gastos={gastos}
          onClearAnios={() => setSelectedAnios([])}
          onClearMeses={() => setSelectedMeses([])}
        />
      )}
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
          <HomeKpiContainer
            marginTop={selectedAnios.length > 0 || selectedMeses.length > 0}
            ingresos={ingresosFiltrados}
            gastos={gastosFiltrados}
          />
          <HomeChartContainer
            ingresos={ingresosFiltrados}
            gastos={gastosFiltrados}
          />
        </Stack>
      )}
    </>
  );
}
