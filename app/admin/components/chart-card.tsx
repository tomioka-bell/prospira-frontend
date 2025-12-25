import { Card, CardContent, Typography, Box } from "@mui/material";

type Props = {
  title: string;
  loading?: boolean;
  children: React.ReactNode;
};

export default function ChartCard({ title, loading, children }: Props) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Box mt={2}>
          {loading ? "กำลังโหลด..." : children}
        </Box>
      </CardContent>
    </Card>
  );
}
