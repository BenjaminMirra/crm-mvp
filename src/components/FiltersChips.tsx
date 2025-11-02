import { mesesNombres } from "../utils";
import { Stack, Typography, Button } from "@mui/material";
import type { FiltersChipsProps } from "../types/types";

const FiltersChips = ({
  selectedAnios,
  selectedMeses,
  ingresos,
  gastos,
  onClearAnios,
  onClearMeses,
}: FiltersChipsProps) => {
  const handleClear = () => {
    onClearAnios();
    onClearMeses();
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        gap: 1,
        position: "fixed",
        backgroundColor: (theme) => theme.palette.background.default,
        zIndex: 1,
        px: { xs: 4, sm: 6, md: 6, lg: 10 },
        py: 2,
        width: "98%"
      }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={handleClear}
        disabled={selectedAnios.length === 0 && selectedMeses.length === 0}
      >
        Limpiar filtros
      </Button>
      <Typography variant="body2" color="text.secondary">
        Filtrando por: {/* Años */}
        {selectedAnios.length > 0 && (
          <>
            Año{selectedAnios.length > 1 ? "s" : ""}:{" "}
            {(() => {
              // Obtener todos los años posibles
              const allAnios = Array.from(
                new Set(
                  [...ingresos, ...gastos].map(
                    (item) => item.fecha.split("-")[0]
                  )
                )
              ).sort();
              return selectedAnios.length === allAnios.length
                ? "Todos"
                : selectedAnios.join(", ");
            })()}
          </>
        )}
        {/* Meses */}
        {selectedMeses.length > 0 && (
          <>
            {selectedAnios.length > 0 ? " | " : " "}
            Mes{selectedMeses.length > 1 ? "es" : ""}:{" "}
            {(() => {
              // Obtener todos los meses posibles
              const allMeses = Array.from(
                new Set(
                  [...ingresos, ...gastos].map(
                    (item) => item.fecha.split("-")[1]
                  )
                )
              ).sort((a, b) => parseInt(a) - parseInt(b));
              return selectedMeses.length === allMeses.length
                ? "Todos"
                : selectedMeses
                    .map((m) => mesesNombres[parseInt(m) - 1])
                    .join(", ");
            })()}
          </>
        )}
      </Typography>
    </Stack>
  );
};

export default FiltersChips;
