import { apiLogout } from "@/apis/auth/auth";
import { LOGIN_PATH } from "@/constants";
import { message } from "@/hooks/useAppStatic";
import { KeepAliveRefContext } from "@/layouts";
import useAuthStore from "@/stores/auth/auth.store";
import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Dropdown, Row, type MenuProps } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

enum MenuItemKey {
  PASSWORD = "PASSWORD",
  LOGOUT = "LOGOUT",
}

const items: MenuProps["items"] = [
  {
    label: "修改密码",
    key: MenuItemKey.PASSWORD,
    icon: <LockOutlined />,
  },
  { type: "divider" },
  {
    label: "退出登录",
    key: MenuItemKey.LOGOUT,
    danger: true,
    icon: <LogoutOutlined />,
  },
];

const PersonCenter: React.FC = () => {
  const navigate = useNavigate();
  const keepAliveRef = useContext(KeepAliveRefContext);
  const { userInfo, setUserInfo } = useAuthStore();

  const logout = async () => {
    const response = await apiLogout();
    if (response.code === 0) {
      keepAliveRef?.current?.cleanAllCache();
      setUserInfo(null);
      message.success("退出成功");
      navigate(LOGIN_PATH);
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case MenuItemKey.PASSWORD:
        message.info(`Click on item ${key}`);
        break;
      case MenuItemKey.LOGOUT:
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <Row gutter={10} className={`cursor-pointer select-none px-3`}>
        <Col>
          <Avatar src={userInfo?.avatar} icon={<UserOutlined />} />
        </Col>
        <Col>{userInfo?.nickname}</Col>
      </Row>
    </Dropdown>
  );
};

export default PersonCenter;
