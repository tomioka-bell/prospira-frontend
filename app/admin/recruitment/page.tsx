"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";

import type { JobRecruitment } from "../types/recruitment";
import CreateRecruitmentModal from "./create-recruitment-modal";
import UpdateRecruitmentModal from "./update-recruitment-modal";

import { Toaster, toast } from "react-hot-toast";

import { Tag, Button, message } from "antd";
import { FireOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";

// material-react-table
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RecruitmentAdminPage() {
  const [rawData, setRawData] = useState<JobRecruitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/job-recruitment/get-job-recruitments?limit=150&offset=0`
      );
      const data = (await res.json()) as JobRecruitment[];
      setRawData(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setRawData([]);
      message.error("โหลดรายการประกาศล้มเหลว");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("Job Recruitment data:", rawData);

  useEffect(() => {
    loadData();
  }, [loadData]);

    const columns = useMemo<MRT_ColumnDef<JobRecruitment>[]>(
    () => [
      {
        id: "rowNumber",
        header: "#",
        size: 60,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "title",
        header: "ตำแหน่ง",
        size: 220,
      },
      {
        accessorKey: "department",
        header: "แผนก",
        size: 160,
        Cell: ({ cell }) => cell.getValue<string>() || "-",
      },
    
      {
        accessorKey: "salary",
        header: "เงินเดือน",
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || "-",
      },
      {
        accessorKey: "hot",
        header: "HOT",
        size: 90,
        Cell: ({ cell }) =>
          cell.getValue<boolean>() ? (
            <Tag icon={<FireOutlined />} color="red">
              HOT
            </Tag>
          ) : (
            <Tag color="blue">Normal</Tag>
          ),
        enableColumnFilter: true,
      },
      {
        accessorKey: "created_at",
        header: "วันที่สร้าง",
        size: 150,
        Cell: ({ cell }) => {
          const v = cell.getValue<string>();
          const d = dayjs(v);
          return d.isValid() ? d.locale("th").format("DD/MM/YYYY") : "-";
        },
        sortingFn: (rowA, rowB, columnId) => {
          const a = dayjs(rowA.getValue<string>(columnId)).valueOf();
          const b = dayjs(rowB.getValue<string>(columnId)).valueOf();
          return a - b;
        },
      },
      {
        id: "actions",
        header: "จัดการ",
        size: 120,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <button
            aria-label="Edit"
            className="text-sky-600 hover:text-sky-700 hover:underline text-sm"
            onClick={() => {
              setEditingId(row.original.job_recruitment_id);
              setOpenUpdate(true);
            }}
          >
            แก้ไข
          </button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rawData,
    state: {
      isLoading: loading,
    },
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    enableColumnActions: true,
    enableDensityToggle: true,
    enableStickyHeader: true,
    enableHiding: true,
    enableExpanding: true,
    positionGlobalFilter: "left",
    initialState: {
      showGlobalFilter: true,
      density: "compact",
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: "created_at", desc: true }],
    },
    paginationDisplayMode: "pages",
    renderDetailPanel: ({ row }) => {
      const record = row.original;
      return (
        <div className="text-sm p-2">
          <p className="mb-2">
            <strong>รายละเอียดงาน: </strong>
            {record.description || "-"}
          </p>
          <p className="mb-1">
            <strong>คุณสมบัติ:</strong>
          </p>
          <ul className="list-disc ml-5">
            {record.requirements?.length ? (
              record.requirements.map((req, i) => <li key={i}>{req}</li>)
            ) : (
              <li>-</li>
            )}
          </ul>
          <p className="mt-2 text-gray-500">ผู้สร้าง: {record.username_creator}</p>
        </div>
      );
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: 2 },
    },
    muiTableContainerProps: {
      sx: { borderRadius: 2 },
    },
  });

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="px-4 pt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-2xl font-bold">
            รายการประกาศรับสมัครงาน
          </h1>

          <div className="flex gap-2">
            <Button
              icon={<ReloadOutlined />}
              onClick={loadData}
            >
              รีเฟรช
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setOpenCreate(true)}
            >
              สร้างประกาศ
            </Button>
          </div>
        </div>

        <MaterialReactTable 
        table={table} />
      </div>

      <CreateRecruitmentModal
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
        onSuccess={() => {
          setOpenCreate(false);
          loadData();
          toast.success("สร้างประกาศสำเร็จ");
        }}
      />

      <UpdateRecruitmentModal
        open={openUpdate}
        jobRecruitmentId={editingId}
        onCancel={() => {
          setOpenUpdate(false);
          setEditingId(undefined);
        }}
        onSuccess={() => {
          setOpenUpdate(false);
          setEditingId(undefined);
          loadData();
          toast.success("อัปเดตประกาศสำเร็จ");
        }}
      />
    </div>
  );
}
