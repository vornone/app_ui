import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import ProtectedRoute from "./components/protected-route";
import LayoutComponent from "./layout/layout";
import DashboardPage from "./pages/dashboard";
import SettingPage from "./pages/setting-page";
import ProductPage from "./pages/product-page";
import ProfileSettingPage from "./pages/user/profile-setting-page";
// Remove the custom RouteObject interface - React Router provides its own

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Auth guard
    children: [
      {
        path: "/",
        element: <LayoutComponent />, // Sidebar + Header
        children: [
          { index: true, element: <DashboardPage /> }, // Default route for / - removed extra >
          { path: "dashboard", element: <DashboardPage /> },
          { path: "setting", element: <SettingPage />},
          { path: "product", element: <ProductPage />},
          { path: "profile", element: <ProfileSettingPage /> },
        ],
      },
    ],
  },
]);

export default routes;
