import usePasteStore from "@/stores/paste/paste.store";
import { formatTimestamp } from "@/utils/formatTime";
import { Button, Card, Space, Table, TableProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import PasteModal from "./components/PasteModal";

interface DataType {
  paste_id: number;
  title: string;
  expired: number;
  create_user: number;
}

const PastePage: React.FC = () => {
  const { pasteList, refreshPasteList } = usePasteStore();
  const [form] = useForm();
  const [pasteModalOpen, setPasteModalOpen] = useState<boolean>(false);
  const [pasteId, setPasteId] = useState<number>(null);

  const openPasteModal = (pasteId?: number) => {
    if (pasteId) {
      setPasteId(pasteId);
      setPasteModalOpen(true);
    } else {
      setPasteId(null);
      setPasteModalOpen(true);
    }
  };

  useEffect(() => {
    if (pasteList === null) {
      refreshPasteList(1, 20);
    }
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "paste_id",
      key: "paste_id",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "过期时间",
      dataIndex: "expired",
      key: "expired",
      render: (text) => <div>{formatTimestamp(text)}</div>,
    },
    {
      title: "创建人",
      dataIndex: "create_user",
      key: "create_user",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openPasteModal(record.paste_id)}>详情</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={() => openPasteModal()}>
          新建
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={pasteList}
        bordered
        style={{ width: "90%" }}
      />
      {JSON.stringify(pasteList)}
      <PasteModal
        open={pasteModalOpen}
        setOpen={setPasteModalOpen}
        pasteId={pasteId}
      />
    </Card>
  );
};

export default PastePage;
