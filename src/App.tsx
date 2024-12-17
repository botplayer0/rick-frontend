import { useTitle } from "ahooks";
import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { apiHealthCheck } from "./apis/auth/auth";
import LazyLoading from "./components/LazyLoading";
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
  const [firstHealthCheck, setFirstHealthCheck] = useState<boolean>(false);
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

  useEffect(() => {
    // Token健康检查
    const fetchHealth = async () => {
      const response = await apiHealthCheck();
      setFirstHealthCheck(true);
    };
    if (pathname !== "/login") {
      if (!firstHealthCheck) {
        fetchHealth();
      }
    } else {
      // userInfo检查, 在http.ts中, 如果401尝试刷新token, 失败清理userInfo触发UseEffect
      if (
        !userInfo ||
        (userInfo && Object.keys(userInfo).length === 0) ||
        !userInfo?.token
      ) {
        return navigate("/login", { replace: true });
      }
    }
    setLoding(false);
  }, [userInfo, pathname]);

  return (
    <Suspense fallback={<LazyLoading />}>
      {useRoutes([...noAuthRoutes, ...authRoutes])}
    </Suspense>
  );
};

export default App;
