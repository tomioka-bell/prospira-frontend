import { PieChart } from "@mui/x-charts/PieChart";

export type PieItem = {
  label: string;
  value: number;
};

type Props = {
  data: PieItem[];
};

export default function AppsPieChart({ data }: Props) {
  return (
    <PieChart
      height={260}
      series={[
        {
          data: data.map((d, index) => ({
            id: index,
            value: d.value,
            label: d.label,
          })),
        },
      ]}
    />
  );
}
