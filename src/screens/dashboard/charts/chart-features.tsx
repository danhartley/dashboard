import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { ColourType } from "src/shared/types";

Chart.register(annotationPlugin);
Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

type ChartProps = {
  totals: {
    honouring: number;
    breaking: number;
  };
};

const TotalsChart = ({ totals }: ChartProps) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const bgColours = Array<ColourType>();
    bgColours.push("#7f1d1d");
    bgColours.push("#0c4a6e");

    setData({
      type: "bar",
      labels: ["Honoured", "Breaking"],
      datasets: [
        {
          label: "Total scores",
          data: [totals.honouring, totals.breaking * -1],
          backgroundColor: bgColours,
        },
      ],
    });
  }, [totals]);

  const options = {
    scales: {
      x: {
        grid: {
          borderColor: "black",
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        grid: {
          borderColor: "black",
        },
        ticks: {
          color: "black",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 15,
          },
          generateLabels: function (chart) {
            const ds = chart.data.datasets[0];
            return [
              {
                datasetIndex: 0,
                text: ds.label,
                fillStyle: "black",
                fontColor: "black",
              },
            ];
          },
        },
      },
    },
  };

  return (
    <>
      {data === null ? (
        <div>
          There is either no data, or you have disabled JavaScript which is
          necessary to view charts on this site.
        </div>
      ) : (
        <div>
          <div role="tabpanel">
            <h3 className="font-serif mb-4">
              <em>Totals for honouring and breaking pledges</em>
            </h3>
            <Bar data={data} options={options}>
              <div>Please see data in tabular form</div>
            </Bar>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalsChart;
