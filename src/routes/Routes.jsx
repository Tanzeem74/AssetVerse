import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/homePage/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authPage/Login";
import Register from "../pages/authPage/Register";
import RegisterHR from "../pages/authPage/RegisterHR";
import ErrorPage from "../pages/ExtraPage/ErrorPage";
import PrivateRoute from "../Provider/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import RequestAsset from "../pages/Dashboard/employeeDashboard/RequestAsset";
import MyAssets from "../pages/Dashboard/employeeDashboard/MyAsset";
import AddAsset from "../pages/Dashboard/hrDashboard/AddAsset";
import AssetList from "../pages/Dashboard/hrDashboard/AssetList";
import AllRequest from "../pages/Dashboard/hrDashboard/AllRequest";
import MyEmployeeList from "../pages/Dashboard/hrDashboard/MyEmployeeList";
import AddEmployee from "../pages/Dashboard/hrDashboard/AddEmployee";
import Upgrade from "../pages/Dashboard/hrDashboard/Upgrade";
import PaymentSuccess from "../pages/Dashboard/hrDashboard/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/hrDashboard/PaymentHistory";
import MyTeam from "../pages/Dashboard/employeeDashboard/MyTeam";
import HRRoute from "../Provider/HRRoute";
import EmployeeRoute from "../Provider/EmployeeRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Home
      }
    ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'signup-user',
        Component: Register
      },
      {
        path: 'signup-hr',
        Component: RegisterHR
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'add-assets',
        element: <HRRoute>
          <AddAsset></AddAsset>
        </HRRoute>
      },
      {
        path: 'assets-list',
        element: <HRRoute>
          <AssetList></AssetList>
        </HRRoute>
      },
      {
        path: 'all-requests',
        element: <HRRoute><AllRequest></AllRequest></HRRoute>
      },
      {
        path: 'my-employees',
        element: <HRRoute><MyEmployeeList></MyEmployeeList></HRRoute>
      },
      {
        path: 'add-employee',
        element: <HRRoute><AddEmployee></AddEmployee></HRRoute>
      },
      {
        path: 'upgrade',
        element: <HRRoute><Upgrade></Upgrade></HRRoute>
      },
      {
        path: 'payment-success',
        element: <HRRoute><PaymentSuccess></PaymentSuccess></HRRoute>
      },
      {
        path: 'payment-history',
        element: <HRRoute><PaymentHistory></PaymentHistory></HRRoute>
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'my-team',
        element: <EmployeeRoute><MyTeam></MyTeam></EmployeeRoute>
      },
      {
        path: 'my-assets',
        element: <EmployeeRoute><MyAssets></MyAssets></EmployeeRoute>
      },
      {
        path: 'request-asset',
        element: <EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute>
      }
    ]
  },
  {
    path: '/*',
    Component: ErrorPage
  }
]);
