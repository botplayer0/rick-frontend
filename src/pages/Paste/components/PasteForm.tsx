import { PasteDetailFormProps } from "@/apis/paste/paste.type";
import NewEditorJson from "@/components/CodeEditor/NewEditorJson";
import NewEditorPython from "@/components/CodeEditor/NewEditorPython";
import NewEditorText from "@/components/CodeEditor/NewEditorText";
import { DatePicker, Form, Input, Select } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";

interface IProps {
  form: FormInstance<PasteDetailFormProps>;
}

const PasteForm: React.FC<IProps> = (props) => {
  // const [form] = useForm();
  const { form } = props;
  const contentType = Form.useWatch("content_type", form);

  const disabledDate: DatePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current.isBefore(dayjs().startOf("day"));
  };
  return (
    <Form form={form} labelCol={{ span: 2 }}>
      <Form.Item label="标题" name="title" wrapperCol={{ span: 8 }}>
        <Input />
      </Form.Item>

      <Form.Item label="有效时间" name="expired" wrapperCol={{ span: 8 }}>
        <DatePicker
          showTime
          disabledDate={disabledDate}
          style={{ width: "100%" }}
          presets={[
            { label: "一天后", value: dayjs().add(1, "d") },
            { label: "一个小时后", value: dayjs().add(1, "h") },
            { label: "永远", value: dayjs().add(10, "year") },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="数据类型"
        name="content_type"
        initialValue={"3"}
        wrapperCol={{ span: 8 }}
      >
        <Select>
          <Select.Option value="1">代码</Select.Option>
          <Select.Option value="2">JSON</Select.Option>
          <Select.Option value="3">文本</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="内容" name="content">
        {/* <EditorJsonForms contorl={form} /> */}
        {/* <EditorPythonForm control={form} /> */}
        {contentType === "1" && <NewEditorPython />}
        {contentType === "2" && <NewEditorJson />}
        {contentType === "3" && <NewEditorText />}
      </Form.Item>
    </Form>
  );
};

export default PasteForm;
