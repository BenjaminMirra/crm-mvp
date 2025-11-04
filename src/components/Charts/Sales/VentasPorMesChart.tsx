import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface VentasPorMesChartProps {
  categories: string[];
  series: {
    type: "column";
    name: string;
    data: number[];
    color: string;
  }[];
}

const VentasPorMesChart: React.FC<VentasPorMesChartProps> = ({
  categories,
  series,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Monto ($)",
      },
    },
    tooltip: {
      valuePrefix: "$",
      valueDecimals: 0,
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default VentasPorMesChart;
