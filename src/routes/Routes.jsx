import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/homePage/Home";
import AuthLayout from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
        {
            path:'/',
            Component:Home
        }
    ]
  },
  {
    path:'/auth',
    Component:AuthLayout,
    children:[
        {
            path:'login',
        },
        {
            path:'signup-user',
        },
        {
            path:'signup-hr',
        }
    ]
  }
]);
