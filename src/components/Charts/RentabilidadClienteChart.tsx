import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Definimos la estructura de las props
interface RentabilidadClienteChartProps {
  categories: string[];
  series: {
    type: "bar";
    name: string;
    data: number[];
    color: string;
  }[];
}

const RentabilidadClienteChart: React.FC<RentabilidadClienteChartProps> = ({
  categories,
  series,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar", // Gráfico de Barras horizontales
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories, // Eje X con los nombres de clientes
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Tarifa ($ / Hora)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valuePrefix: "$",
      valueSuffix: " / hora",
      valueDecimals: 0,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "${y:,.0f} / hr", // Muestra el valor en la barra
        },
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RentabilidadClienteChart;
