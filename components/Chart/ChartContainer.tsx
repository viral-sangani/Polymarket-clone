import React from "react";
import { Chart } from "react-google-charts";

function ChartContainer() {
  return (
    <>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="LineChart"
        loader={<div>Please Wait</div>}
        data={[
          [{ type: "date", label: "Day" }, "yes", "no"],
          // ["timestamp", ],
          [new Date(1635825475), 0, 35],
          [new Date(1635824475), 10, 32],
          [new Date(1635823475), 23, 40],
          [new Date(1635822475), 17, 33],
          [new Date(1635821475), 18, 27],
          [new Date(1635820475), 9, 11],
          [new Date(1635819475), 11, 9],
          [new Date(1635818475), 27, 18],
          [new Date(1635817475), 33, 17],
          [new Date(1635816475), 40, 23],
          [new Date(1635815475), 32, 10],
          [new Date(1635814475), 35, 0],
        ]}
        options={{
          hAxis: {
            title: "Time",
          },
          vAxis: {
            title: "Amount",
          },
          // series: {
          //   0: { curveType: "function" },
          //   1: { curveType: "function" },
          // },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </>
  );
}

export default ChartContainer;
