import { apiLogin } from "@/apis/auth/auth";
import { RequestAuthRegister } from "@/apis/auth/auth.type";
import { message } from "@/hooks/useAppStatic";
import useAuthStore from "@/stores/auth/auth.store";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "../index.css";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
export default () => {
  const { setUserInfo, setCurrentUserId } = useAuthStore();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const loginData = { account: values.account, password: values.password };
    const response = await apiLogin(loginData);
    if (response.code === 0 && response.data.token) {
      setUserInfo(response.data);
      setCurrentUserId(response.data.user_id);
      navigate("/");
      message.success(`${response.data.nickname}, 登录成功~🎉`);
    }
  };
  return (
    <Form<RequestAuthRegister>
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="account"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="输入账号或邮箱" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="输入密码" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
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
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
