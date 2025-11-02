import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Definimos la estructura de las props que esperamos
interface FlujoCajaChartProps {
  categories: string[];
  // Definimos el tipo de 'series' más explícitamente para TypeScript
  series: {
    type: "column";
    name: string;
    data: number[];
    color: string;
  }[];
}

const FlujoCajaChart: React.FC<FlujoCajaChartProps> = ({
  categories,
  series,
}) => {
  // Opciones de configuración para el Column Chart
  const options: Highcharts.Options = {
    chart: {
      type: "column", // Gráfico de Columnas
      height: 300,
    },
    title: {
      text: "", // Sin título, lo maneja MUI
    },
    xAxis: {
      categories: categories, // Eje X con los meses
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Monto ($)", // Título del eje Y
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:,.0f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: series, // ¡Aquí pasamos nuestras series! (Ingresos y Gastos)
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default FlujoCajaChart;
