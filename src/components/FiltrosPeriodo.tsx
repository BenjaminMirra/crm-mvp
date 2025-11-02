import { useMemo } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

export interface FiltrosPeriodoProps {
  data: { fecha: string }[];
  selectedAnios: string[];
  selectedMeses: string[];
  onChangeAnios: (anios: string[]) => void;
  onChangeMeses: (meses: string[]) => void;
}

const mesesNombres = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function FiltrosPeriodo({
  data,
  selectedAnios,
  selectedMeses,
  onChangeAnios,
  onChangeMeses,
}: FiltrosPeriodoProps) {
  // Extraer años y meses únicos de los datos
  const { anios, meses } = useMemo(() => {
    const aniosSet = new Set<string>();
    const mesesSet = new Set<string>();
    data.forEach((item) => {
      const [year, month] = item.fecha.split("-");
      aniosSet.add(year);
      mesesSet.add(month);
    });
    return {
      anios: Array.from(aniosSet).sort(),
      meses: Array.from(mesesSet).sort((a, b) => parseInt(a) - parseInt(b)),
    };
  }, [data]);

  return (
    <Box sx={{ display: { xs: 'none', sm: 'inline-flex' }, gap: 2 }}>
      <FormControl
        size="small"
        sx={{
          width: 200,
          background: "#fff",
          borderRadius: 1,
        }}
      >
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 320,
              },
            },
          }}
          multiple
          value={selectedAnios}
          onChange={(e) =>
            onChangeAnios(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          renderValue={(selected) =>
            selected.length === 0 ? "Filtar por año(s)" : selected.join(", ")
          }
          displayEmpty
        >
          {anios.map((anio) => (
            <MenuItem key={anio} value={anio}>
              <Checkbox checked={selectedAnios.indexOf(anio) > -1} />
              <ListItemText primary={anio} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{
          width: 200,
          background: "#fff",
          borderRadius: 1,
        }}
      >
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 320,
              },
            },
          }}
          multiple
          value={selectedMeses}
          onChange={(e) =>
            onChangeMeses(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          renderValue={(selected) =>
            (selected as string[]).length === 0
              ? "Filtrar mes(es)"
              : (selected as string[])
                  .map((m) => mesesNombres[parseInt(m) - 1])
                  .join(", ")
          }
          displayEmpty
        >
          {meses.map((mes) => (
            <MenuItem key={mes} value={mes}>
              <Checkbox checked={selectedMeses.indexOf(mes) > -1} />
              <ListItemText primary={mesesNombres[parseInt(mes) - 1]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
