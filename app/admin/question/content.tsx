import { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import type { MRT_ColumnDef } from "material-react-table";
import axios from "axios";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Questionnaire {
  questionnaire_id: string;
  questionnaire_name: string;
  questionnaire_phone: string;
  questionnaire_email: string;
  question: string;
  questionnaire_type: string;
  status: string;
  questionnaire_status: string;
  created_at: string;
  updated_at: string;
}

export default function Content() {
  const [data, setData] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE}/api/questionnaire/get-questionnaires`,
          { params: { limit: 5, offset: 0 } }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Questionnaire>[]>(
    () => [
      { accessorKey: "questionnaire_name", header: "ชื่อ-นามสกุล" },
      { accessorKey: "questionnaire_email", header: "อีเมล" },
      { accessorKey: "question", header: "คำถาม" },
      { accessorKey: "questionnaire_phone", header: "โทรศัพท์" },
      { accessorKey: "questionnaire_type", header: "ประเภท" },
      { accessorKey: "questionnaire_status", header: "สถานะ" },
      { accessorKey: "created_at", header: "วันที่สร้าง" },
    ],
    []
  );

  return (
    <div className="p-4">
      <MaterialReactTable
        columns={columns}
        data={data}
        enablePagination
        enableSorting
        enableColumnOrdering
        enableGlobalFilter
        state={{ isLoading: loading }}
      />
    </div>
  );
}
