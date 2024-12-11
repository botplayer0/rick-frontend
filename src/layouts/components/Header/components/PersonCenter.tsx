import { apiLogout } from "@/apis/auth/auth";

import { message } from "@/hooks/useAppStatic";
import useAuthStore from "@/stores/auth/auth.store";
// import { KeepAliveRefContext } from "@/layouts";

import {
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Dropdown, Row, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

enum MenuItemKey {
  USERCENTER = "USERCENTER",
  LOGOUT = "LOGOUT",
  ADMIN = "ADMIN",
}

const PersonCenter: React.FC = () => {
  const navigate = useNavigate();
  // const keepAliveRef = useContext(KeepAliveRefContext);
  const { userInfo, setUserInfo } = useAuthStore();

  const items: MenuProps["items"] = [
    {
      label: "个人中心",
      key: MenuItemKey.USERCENTER,
      icon: <LockOutlined />,
    },
    { type: "divider" },
    {
      label: "超级管理",
      key: MenuItemKey.ADMIN,
      icon: <SettingOutlined />,
      disabled: userInfo.role === 2 ? false : true,
    },
    { type: "divider" },
    {
      label: "退出登录",
      key: MenuItemKey.LOGOUT,
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const goToAdmin = () => {
    if (userInfo.role === 2) {
      navigate("/admin");
    } else {
      message.error("仅管理员可访问");
    }
  };

  const logout = async () => {
    const response = await apiLogout();
    if (response.code === 0) {
      // keepAliveRef?.current?.cleanAllCache();
      setUserInfo(null);
      message.success("退出成功");
      navigate("/login");
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case MenuItemKey.USERCENTER:
        navigate("/usercenter");
        break;
      case MenuItemKey.ADMIN:
        goToAdmin();
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
