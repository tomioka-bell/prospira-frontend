"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Image from "next/image";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { buildImageURL } from "@/app/[lang]/utils/build-image-url";
import CreateActivitiesModal from "./create-activities-modal";
import UpdateActivitiesModal from "./update-activities-modal";
import type { NewsItemApi } from "../types/company-news";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Content() {
  const [data, setData] = useState<NewsItemApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<NewsItemApi | undefined>(undefined);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE}/api/company-news/get-company-news`,
        { params: { limit: 100, offset: 0 } }
      );
      
      let newsData: NewsItemApi[] = [];
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        newsData = response.data as NewsItemApi[];
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        newsData = response.data.data as NewsItemApi[];
      }
      
      setData(newsData);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("Activities data:", data);

  const handleDelete = async (companyNewsId: string, title: string) => {
    Modal.confirm({
      title: "ยืนยันการลบ",
      icon: <ExclamationCircleOutlined />,
      content: `คุณต้องการลบกิจกรรม "${title}" หรือไม่?`,
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      async onOk() {
        setDeleting(companyNewsId);
        try {
          await axios.delete(
            `${API_BASE}/api/company-news/delete-company-news/${companyNewsId}`
          );
          message.success("ลบกิจกรรมสำเร็จ");
          fetchActivities();
        } catch (error) {
          console.error("Error deleting activity:", error);
          message.error("เกิดข้อผิดพลาดในการลบกิจกรรม");
        } finally {
          setDeleting(null);
        }
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<NewsItemApi>[]>(
    () => [
      {
        accessorKey: "company_news_photo",
        header: "รูปภาพ",
        size: 120,
        enableSorting: false,
        Cell: ({ row }) => (
          row.original.company_news_photo ? (
            <Image
              src={buildImageURL(row.original.company_news_photo)}
              alt={row.original.title}
              width={80}
              height={60}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-20 h-15 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
              ไม่มีรูป
            </div>
          )
        ),
      },
      {
        accessorKey: "title",
        header: "หัวข้อ",
        size: 250,
        Cell: ({ row }) => (
          <div className="font-medium text-gray-800 line-clamp-2">
            {row.original.title}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "หมวดหมู่",
        size: 120,
        Cell: ({ row }) => (
          row.original.category ? (
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full">
              {row.original.category}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          )
        ),
      },
      {
        accessorKey: "content",
        header: "เนื้อหา",
        size: 200,
        Cell: ({ row }) => (
          <div className="text-sm text-gray-600 line-clamp-2">
            {row.original.content || "-"}
          </div>
        ),
      },
      {
        accessorKey: "username_creator",
        header: "ผู้สร้าง",
        size: 120,
        Cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {row.original.username_creator || "-"}
          </span>
        ),
      },
      {
        accessorKey: "created_at",
        header: "วันที่สร้าง",
        size: 130,
        Cell: ({ row }) => (
          <span className="text-sm text-gray-600">
            {dayjs(row.original.created_at).locale("th").format("DD MMM YYYY")}
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">กิจกรรม/ข่าวสาร</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setOpenCreateModal(true)}
        >
          เพิ่มกิจกรรม
        </Button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <MaterialReactTable
          columns={columns}
          data={data}
          state={{ isLoading: loading }}
          enableRowActions
          positionActionsColumn="last"
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "จัดการ",
              size: 180,
              muiTableHeadCellProps: {
                align: "center",
              },
              muiTableBodyCellProps: {
                align: "center",
              },
            },
          }}
          renderRowActions={({ row }) => (
            <div className="flex gap-2 justify-center">
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedActivity(row.original);
                  setOpenUpdateModal(true);
                }}
              >
                แก้ไข
              </Button>
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                loading={deleting === row.original.company_news_id}
                onClick={() => handleDelete(row.original.company_news_id, row.original.title)}
              >
                ลบ
              </Button>
            </div>
          )}
          muiTableContainerProps={{
            sx: { maxHeight: "calc(100vh - 250px)" },
          }}
          muiTablePaperProps={{
            elevation: 0,
            sx: { borderRadius: "16px" },
          }}
          enableColumnResizing
          enableStickyHeader
          enablePagination
          initialState={{
            density: "comfortable",
            pagination: { pageSize: 10, pageIndex: 0 },
          }}
        />
      </div>

      <CreateActivitiesModal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onSuccess={() => {
          setOpenCreateModal(false);
          fetchActivities();
        }}
      />

      <UpdateActivitiesModal
        open={openUpdateModal}
        onCancel={() => {
          setOpenUpdateModal(false);
          setSelectedActivity(undefined);
        }}
        onSuccess={() => {
          setOpenUpdateModal(false);
          setSelectedActivity(undefined);
          fetchActivities();
        }}
        activity={selectedActivity}
      />
    </div>
  );
}
