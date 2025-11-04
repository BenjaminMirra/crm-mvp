import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface GastosEvolucionChartProps {
  categories: string[];
  series: {
    type: "area";
    name: string;
    data: number[];
  }[];
}

const GastosEvolucionChart: React.FC<GastosEvolucionChartProps> = ({
  categories,
  series,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "area",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: "on",
    },
    yAxis: {
      title: {
        text: "Monto ($)",
      },
    },
    tooltip: {
      valuePrefix: "$",
      valueDecimals: 0,
      shared: true,
    },
    plotOptions: {
      area: {
        stacking: "normal",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#666666",
        },
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GastosEvolucionChart;
