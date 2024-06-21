import { apiPasteGetDetail } from "@/apis/paste/paste";
import { PasteDetailFormProps } from "@/apis/paste/paste.type";
import { Button, Form, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import PasteForm from "./PasteForm";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pasteId?: number;
}

const PasteModal: React.FC<IProps> = (props) => {
  const { open, setOpen, pasteId } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm<PasteDetailFormProps>();

  const fetchPasteDetail = async (pasteId: number) => {
    const response = await apiPasteGetDetail(pasteId);
    if (response.code === 0) {
      form.setFieldsValue({
        title: response.data.title,
        content: response.data.content,
        content_type: response.data.content_type.toString(),
        expired: dayjs.unix(response.data.expired),
      });
    }
  };

  const resetForm = () => {
    form.setFieldsValue({
      title: "",
      content: "",
      content_type: "3",
      expired: dayjs().add(1, "hour"),
    });
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    if (pasteId) {
      fetchPasteDetail(pasteId);
    }
    if (pasteId === null) {
      resetForm();
    }
  }, [pasteId]);

  return (
    <>
      <Modal
        title={pasteId ? "详情" : "新建"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            {pasteId && <Button type="dashed">编辑</Button>}
            <OkBtn />
          </>
        )}
      >
        <PasteForm form={form} />
      </Modal>
    </>
  );
};

export default PasteModal;
