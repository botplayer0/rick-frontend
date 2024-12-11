import { useTitle } from "ahooks";
import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { apiHealthCheck } from "./apis/auth/auth";
import LazyLoading from "./components/LazyLoading";
import { LOGIN_PATH } from "./constants";
import useAppTips from "./hooks/useAppStatic";
import { useMatchTitle } from "./hooks/useLayout";
import NotAuth from "./pages/403";
import { layoutRouters, noAuthRoutes } from "./routers";
import { getAuthRouters, type AuthRouteObject } from "./routers/AuthRoute";
import useAuthStore from "./stores/auth/auth.store";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfo } = useAuthStore();
  const [authRoutes, setAuthRouters] = useState<AuthRouteObject[]>([]);
  const [loading, setLoding] = useState<boolean>(true);
  useAppTips();
  useTitle(useMatchTitle(pathname));

  // 根据用户信息获取权限路由（不包括登录和404页面）
  useEffect(() => {
    const _routers = getAuthRouters({
      routers: layoutRouters,
      noAuthElement: () => <NotAuth />,
      render: (element) => (loading ? <LazyLoading /> : element),
      // auth: currentUser?.auth || [],
      auth: ["admin", "user"],
    });
    setAuthRouters(_routers);
  }, [loading]);

  //
  useEffect(() => {
    //  无 token 访问时，访问这两个页面无需认证，其余跳转
    if (!userInfo && !userInfo?.token) {
      return navigate(LOGIN_PATH, { replace: true });
    }
    setLoding(false);
  }, [pathname]);

  useEffect(() => {
    console.log("页面首次访问?");
    // 检查登录状态
    const fetchHealth = async () => {
      const response = await apiHealthCheck();
      console.log(response);
    };
    fetchHealth();
  }, []);

  return (
    <Suspense fallback={<LazyLoading />}>
      {useRoutes([...noAuthRoutes, ...authRoutes])}
    </Suspense>
  );
};

export default App;
