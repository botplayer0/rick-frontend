import EditorJsonForm from "@/components/CodeEditor/EditorJsonForm";
import EditorPythonForm from "@/components/CodeEditor/EditorPythonForm";
import usePasteStore from "@/stores/paste/paste.store";
import { formatTimestamp } from "@/utils/formatTime";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  TableProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";

interface DataType {
  paste_id: number;
  title: string;
  expired: number;
  create_user: number;
}

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
        <a>详情</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const PastePage: React.FC = () => {
  const { pasteList, refreshPasteList } = usePasteStore();
  const [form] = useForm();
  const contentType = Form.useWatch("content_type", form);

  useEffect(() => {
    if (pasteList === null) {
      refreshPasteList(1, 20);
    }
  }, pasteList);

  return (
    <div>
      {JSON.stringify(pasteList)}
      <Table
        columns={columns}
        dataSource={pasteList}
        bordered
        style={{ width: "70%" }}
      />
      <Form form={form}>
        <Form.Item label="标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="有效时间" name="expired">
          <DatePicker
            showTime
            presets={[
              { label: "一天后", value: dayjs().add(1, "d") },
              { label: "一个小时后", value: dayjs().add(1, "h") },
              { label: "永远", value: dayjs().add(10, "year") },
            ]}
          />
        </Form.Item>
        <Form.Item label="数据类型" name="content_type" initialValue={"3"}>
          <Select>
            <Select.Option value="1">代码</Select.Option>
            <Select.Option value="2">JSON</Select.Option>
            <Select.Option value="3">文本</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="内容" name="content">
          {/* <EditorJsonForms contorl={form} /> */}
          {/* <EditorPythonForm control={form} /> */}
          {contentType === "1" && <EditorPythonForm control={form} />}
          {contentType === "2" && (
            <EditorJsonForm contorl={form} keyName="content" />
          )}
          {contentType === "3" && <div>3</div>}
        </Form.Item>
      </Form>
    </div>
  );
};

export default PastePage;
