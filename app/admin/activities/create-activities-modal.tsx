"use client";

import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

type Props = {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CreateActivitiesModal({
  open,
  onCancel,
  onSuccess,
}: Props) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { user } = useUser();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content || "");
      formData.append("category", values.category || "");
      formData.append("username_creator", user?.username || "");

      // Add file if selected
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res = await fetch(
        `${API_BASE}/api/company-news/create-company-news`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `Create failed with status ${res.status}`);
      }

      message.success("เพิ่มกิจกรรมสำเร็จ");
      form.resetFields();
      setFileList([]);
      onSuccess();
    } catch (err: unknown) {
      const error = err as Record<string, unknown>;
      if (error?.errorFields) return;
      console.error(err);
      message.error("เกิดข้อผิดพลาดในการเพิ่มกิจกรรม");
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
      title="เพิ่มกิจกรรม/ข่าวสาร"
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
          label="รูปภาพ"
          rules={[{ required: true, message: "กรุณาอัพโหลดรูปภาพ" }]}
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
