import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Card, Divider, Menu } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import ModifyPwd from "./components/ModifyPwd";

type MenuItem = Required<MenuProps>["items"][number];

export default () => {
  const [navPage, setNavPage] = useState<string>("profile");

  const items: MenuItem[] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人资料",
      onClick: () => setNavPage("profile"),
    },
    {
      key: "password",
      icon: <SettingOutlined />,
      label: "修改密码",
      onClick: () => setNavPage("password"),
    },
  ];

  return (
    <ProCard split="vertical">
      <Menu items={items} defaultSelectedKeys={["profile"]} />
      <ProCard>
        {navPage === "profile" && <UserProfile />}
        {navPage === "password" && <ModifyPwd />}
      </ProCard>
    </ProCard>
  );
};
