import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import DashLayout from "../DashLayout/DashLayout";
import MainDashboard from "../Dashboard/MainDashboard/MainDashboard";
import CreateRequest from "../Dashboard/CreateRequest/CreateRequest";
import AllUsers from "../Dashboard/All Users/AllUsers";
import PrivateRoute from "../router/PrivetRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout> </RootLayout>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login 
            },
            {
                path: '/register',
                Component: Register 
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashLayout> </DashLayout></PrivateRoute>,
        children:[
            {
            index: true,
            Component: MainDashboard

        },
        {
            path: 'create-donation-request',
            Component: CreateRequest
        },
        {
            path: 'all-users',
            Component: AllUsers
        }
        ]
    }
]);

export default router