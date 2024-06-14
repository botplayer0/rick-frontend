import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./index.css";

const Login: React.FC = () => {
  const [loginWay, setLoginWay] = useState<string>("login");

  const onChangeTabs = (key: string) => {
    setLoginWay(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "login",
      label: "登录",
      children: <LoginForm />,
    },
    {
      key: "register",
      label: "注册",
      children: <RegisterForm setLoginWay={setLoginWay} />,
    },
  ];

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="src/assets/login/login_page.avif" alt="Login" />
        </div>
        <Tabs
          centered
          className="login-form-box"
          defaultActiveKey={loginWay}
          activeKey={loginWay}
          items={items}
          onChange={onChangeTabs}
        />
      </div>
    </div>
  );
};

export default Login;
