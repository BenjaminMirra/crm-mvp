import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface GastosEspecificosChartProps {
  categories: string[];
  series: {
    type: "bar";
    name: string;
    data: number[];
    color: string;
  }[];
}

const GastosEspecificosChart: React.FC<GastosEspecificosChartProps> = ({
  categories,
  series,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Monto ($)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valuePrefix: "$",
      valueDecimals: 0,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "${y:,.0f}",
          style: {
            fontSize: "10px",
            textOutline: "none",
          }
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

export default GastosEspecificosChart;
