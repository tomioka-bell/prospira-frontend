"use client";

import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import type { NewsItemApi } from "../types/company-news";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  activity?: NewsItemApi;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UpdateActivitiesModal({
  open,
  onCancel,
  onSuccess,
  activity,
}: Props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { user } = useUser();

  // Initialize form with activity data when modal opens
  useEffect(() => {
    if (open && activity) {
      form.setFieldsValue({
        title: activity.title,
        content: activity.content,
        category: activity.category,
      });

      // If there's an existing photo, add it to fileList
      if (activity.company_news_photo) {
        setFileList([
          {
            uid: "-1",
            name: "existing-photo",
            status: "done",
            url: activity.company_news_photo,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [open, activity, form]);


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      if (!activity?.company_news_id) {
        message.error("ไม่พบรหัสกิจกรรม");
        return;
      }


      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content || "");
      formData.append("category", values.category || "");
      formData.append("username_creator", user?.username || "");

      // Add file if a new file was selected (not the existing one)
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await fetch(
        `${API_BASE}/api/company-news/update-company-news/${activity.company_news_id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Update failed with status ${res.status}`);
      }

      message.success("แก้ไขกิจกรรมสำเร็จ");
      form.resetFields();
      setFileList([]);
      onSuccess();
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      if (error?.errorFields) return;
      console.error(err);
      message.error("เกิดข้อผิดพลาดในการแก้ไขกิจกรรม");
    } finally {
      setSubmitting(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("ขนาดไฟล์ต้องน้อยกว่า 5MB");
      return false;
    }
    return true;
  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title="แก้ไขกิจกรรม/ข่าวสาร"
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="บันทึก"
      cancelText="ยกเลิก"
      confirmLoading={submitting}
      destroyOnClose
      maskClosable={false}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          category: "",
        }}
      >
        <Form.Item
          name="title"
          label="หัวข้อ"
          rules={[{ required: true, message: "กรุณากรอกหัวข้อกิจกรรม" }]}
        >
          <Input
            placeholder="เช่น ประชุมประจำปี"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="content"
          label="เนื้อหา"
          rules={[{ required: true, message: "กรุณากรอกเนื้อหา" }]}
        >
          <Input.TextArea
            placeholder="กรอกรายละเอียดกิจกรรม"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="หมวดหมู่"
        >
          <Input
            placeholder="เช่น ข่าวสาร, กิจกรรม, ประกาศ"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="photo"
          label="รูปภาพ (เลือกใหม่เพื่อเปลี่ยน)"
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>
              เลือกรูปภาพ
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
