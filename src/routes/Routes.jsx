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
    children:[
      {
        path:'profile',
        Component:Profile
      }
    ]
  },
  {
    path: '/*',
    Component: ErrorPage
  }
]);
