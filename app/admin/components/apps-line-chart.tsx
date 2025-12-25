import { LineChart } from "@mui/x-charts/LineChart";

export type LineItem = {
  day: string;
  count: number;
};

type Props = {
  data: LineItem[];
};

export default function AppsLineChart({ data }: Props) {
  return (
    <LineChart
      height={260}
      series={[
        {
          data: data.map((d) => d.count),
          label: "Applications",
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: data.map((d) => d.day),
        },
      ]}
    />
  );
}
