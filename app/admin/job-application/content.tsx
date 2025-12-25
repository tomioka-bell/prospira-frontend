import { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from 'material-react-table';
import type { MRT_ColumnDef } from "material-react-table";
import axios from "axios";

interface JobApplication {
  job_application_id: string;
  full_name: string;
  email: string;
  phone: string;
  resume: string;
  note: string;
  status: string;
  username_creator: string;
  position: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function Content() {
  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE}/api/job-application/get-job-applications`,
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

  const columns = useMemo<MRT_ColumnDef<JobApplication>[]>(
    () => [
      { accessorKey: "full_name", header: "ชื่อ-นามสกุล" },
      { accessorKey: "email", header: "อีเมล" },
      { accessorKey: "phone", header: "โทรศัพท์" },
      { accessorKey: "position", header: "ตำแหน่ง" },
      { accessorKey: "status", header: "สถานะ" },
      { accessorKey: "created_at", header: "วันที่สร้าง" },
      {
        accessorKey: "resume",
        header: "ไฟล์ Resume",
        Cell: ({ cell }) => (
          <a
            href={`${API_BASE}/${cell.getValue<string>()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            ดูไฟล์
          </a>
        ),
      },
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
