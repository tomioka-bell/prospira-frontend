import { BarChart } from "@mui/x-charts/BarChart";

export type BarItem = {
  name: string;
  count: number;
};

type Props = {
  data: BarItem[];
};

export default function AppsBarChart({ data }: Props) {
  return (
    <BarChart
      height={260}
      series={[
        {
          data: data.map((d) => d.count),
          label: "จำนวน",
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: data.map((d) => d.name),
        },
      ]}
    />
  );
}
