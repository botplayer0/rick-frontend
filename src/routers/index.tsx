import {
  BarChartOutlined,
  BarsOutlined,
  CodeOutlined,
  CrownOutlined,
  DashboardOutlined,
  HomeOutlined,
  InsertRowBelowOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  SwitcherOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import type { AuthRouteObject } from "./AuthRoute";

const Layout = lazy(() => import("@/layouts"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Access = lazy(() => import("@/pages/Access"));
const TableList = lazy(() => import("@/pages/TableList"));
const KeepComp = lazy(() => import("@/pages/KeepComp"));
const Test = lazy(() => import("@/pages/Test"));
const DynamicRoute = lazy(() => import("@/pages/DynamicRoute"));
const NotFound = lazy(() => import("@/pages/404"));
const Project = lazy(() => import("@/pages/Project"));
const ProjectDetail = lazy(() => import("@/pages/Project/ProjectDetail"));
const PastePage = lazy(() => import("@/pages/Paste"));

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
  hideMenu?: boolean; // 该页面是否挂载到菜单栏中，默认 false
};
type Cache = {
  noCache?: boolean; // 默认全部缓存，不缓存，需明确设置到某个组件
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu & Cache>;

// 动态路由正常情况下是不会在 Menu 中显示，请尽量配置 hideMenu:true
export const layoutRouters: MetaMenuAuthRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        name: "首页",
        element: <Home />,
        icon: <HomeOutlined />,
      },
      {
        path: "/dashboard",
        name: "工作台",
        icon: <DashboardOutlined />,
        children: [
          {
            path: "/dashboard/mine",
            element: <div>我的</div>,
            name: "我的",
          },
          {
            path: "/dashboard/statistics",
            element: <div>数据统计</div>,
            name: "数据统计",
          },
        ],
      },
      {
        path: "/config",
        name: "配置管理",
        icon: <BarChartOutlined />,
        children: [
          {
            path: "/config/project",
            name: "项目配置",
            element: <Project />,
          },
          {
            path: "/config/project/:projectId",
            name: "项目详情",
            element: <ProjectDetail />,
            hideMenu: true,
          },
        ],
      },
      {
        path: "/apitest",
        name: "接口测试",
        icon: <RocketOutlined />,
        children: [
          {
            path: "/apitest/envs",
            name: "环境配置",
            icon: <BarChartOutlined />,
            element: <div>环境</div>,
          },
          {
            path: "/apitest/testcase",
            name: "测试用例",
            element: <div>测试用例</div>,
            icon: <BarsOutlined />,
          },
          {
            path: "/apitest/testcase/:caseId",
            name: "用例详情",
            element: <div>用例详情</div>,
            hideMenu: true,
          },
          {
            path: "/apitest/script",
            name: "公共脚本",
            element: <div>公共脚本</div>,
            icon: <CodeOutlined />,
          },
          {
            path: "/apitest/plan",
            name: "测试计划",
            element: <div>测试计划</div>,
            icon: <PlayCircleOutlined />,
          },
        ],
      },
      {
        path: "/tools",
        name: "工具",
        icon: <BarChartOutlined />,
        children: [
          {
            path: "/tools/share",
            name: "文本分享",
            element: <PastePage />,
          },
        ],
      },
      {
        path: "/access",
        name: "权限示例",
        element: <Access />,
        icon: <CrownOutlined />,
        auth: ["admin", "user"],
      },
      {
        path: "/table-list",
        name: "表格示例",
        element: <TableList />,
        icon: <TableOutlined />,
        auth: "admin",
      },
      {
        path: "/keep-comp",
        name: "组件缓存",
        element: <KeepComp />,
        icon: <SwitcherOutlined />,
      },
      {
        path: "/test",
        name: "测试",
        icon: <InsertRowBelowOutlined />,
        element: <Test />,
        children: [
          {
            path: "/test/t1",
            name: "测试1",
            element: <Test />,
            noCache: true,
          },
          {
            path: "/test/t2",
            name: "测试2",
            element: <Test />,
            hideMenu: true,
          },
        ],
      },
      {
        path: "/dynamic-router/:id",
        name: "动态路由",
        element: <DynamicRoute />,
        hideMenu: true,
      },
    ],
  },
];

export const noAuthRoutes: MetaMenuAuthRouteObject[] = [
  {
    path: "/login",
    name: "登录",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
