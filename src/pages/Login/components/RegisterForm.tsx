import { apiRegister } from "@/apis/auth/auth";
import { message } from "@/hooks/useAppStatic";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import "../index.css";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface IPropRegister {
  setLoginWay: (way: "login" | "register") => void;
}

export default (props: IPropRegister) => {
  const [form] = useForm();
  const onRegister = async (values: any) => {
    const registerData = {
      account: values.username,
      password: values.password,
    };
    const response = await apiRegister(registerData);
    if (response.code === 0) {
      message.success("注册成功");
      form.resetFields();
      props.setLoginWay("login");
    } else {
      await form.validateFields();
    }
  };

  return (
    <Form
      form={form}
      name="register-form"
      initialValues={{ remember: true }}
      onFinish={onRegister}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "输入注册邮箱" }]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "输入密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const passwordAgainValue = getFieldValue("passwordAgain");
              if (
                !value ||
                !passwordAgainValue ||
                value === passwordAgainValue
              ) {
                if (value === passwordAgainValue) {
                  form.setFields([
                    {
                      name: "passwordAgain",
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
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="passwordAgain"
        rules={[
          { required: true, message: "再次输入密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const passwordValue = getFieldValue("password");
              if (!value || !passwordValue || value === passwordValue) {
                if (value === passwordValue) {
                  form.setFields([
                    {
                      name: "password",
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
        <Input.Password placeholder="再次输入密码" />
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
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
