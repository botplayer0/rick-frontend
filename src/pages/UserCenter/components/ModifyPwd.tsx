import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export default () => {
  const [form] = useForm();

  const onModifyPwd = async (values: any) => {
    const modifyData = {
      current_pwd: values.form_current_pwd,
      new_pwd: values.form_new_pwd_1,
    };
    console.log("修改密码", modifyData);
  };

  return (
    <Form
      form={form}
      name="modify-password"
      layout={"vertical"}
      onFinish={onModifyPwd}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="form_current_pwd"
        label="输入你的当前密码"
        rules={[{ required: true, message: "输入当前密码" }]}
      >
        <Input placeholder="输入你的当前密码" />
      </Form.Item>
      <Form.Item
        name="form_new_pwd_1"
        label="输入你的新密码"
        rules={[
          { required: true, message: "输入你的新密码" },
          { min: 6, message: "密码最小不能低于6位" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const passwordAgainValue = getFieldValue("form_new_pwd_2");
              if (
                !value ||
                !passwordAgainValue ||
                value === passwordAgainValue
              ) {
                if (value === passwordAgainValue) {
                  form.setFields([
                    {
                      name: "form_new_pwd_2",
                      errors: [],
                    },
                  ]);
                }
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="输入你的新密码" />
      </Form.Item>
      <Form.Item
        name="form_new_pwd_2"
        label="重复输入你的新密码"
        rules={[
          { required: true, message: "重复输入你的新密码" },
          { min: 6, message: "密码最小不能低于6位" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const passwordValue = getFieldValue("form_new_pwd_1");
              if (!value || !passwordValue || value === passwordValue) {
                if (value === passwordValue) {
                  form.setFields([
                    {
                      name: "form_new_pwd_1",
                      errors: [],
                    },
                  ]);
                }
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="重复输入你的新密码" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "100%",
            height: "42px",
            letterSpacing: "1px",
            borderRadius: "6px",
          }}
        >
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};
