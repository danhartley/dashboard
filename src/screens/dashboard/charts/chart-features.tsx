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
    bgColours.push("#166534");
    bgColours.push("#9d174d");

    setData({
      options: {
        plugins: {
          title: {
            display: true,
            text: "Custom Chart Title",
          },
        },
      },
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
            <Bar data={data}>
              <div>Please see data in tabular form</div>
            </Bar>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalsChart;
