import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface HorasPorClienteChartProps {
  categories: string[];
  series: {
    type: "bar";
    name: string;
    data: number[];
    color: string;
  }[];
}

const HorasPorClienteChart: React.FC<HorasPorClienteChartProps> = ({
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
        text: "Horas trabajadas",
        align: "high",
      },
    },
    tooltip: {
      valueSuffix: " hs",
      valueDecimals: 0,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "{y:,.0f} hs",
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

export default HorasPorClienteChart;
