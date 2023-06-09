import {
    createBrowserRouter
} from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../Pages/Home/Home/Home"
import Menu from "../Pages/Menu/Menu/Menu"
import Order from "../Pages/Order/Order/Order"
import Login from "../Pages/Login/Login"
import SignUp from "../Pages/signUp/signUp"
import PrivateRoute from "./PrivateRoute"
import DashBoard from "../Layout/DashBoard"
import MyCart from "../Pages/DashBoard/MyCart/MyCart"
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers"
import AddItem from "../Pages/DashBoard/AddItem/AddItem"
import AdminRoute from "../Routes/AdminRoute"
import ManageItems from "../Pages/DashBoard/ManageITems/ManageItems"
import Payment from "../Pages/DashBoard/Payment/Payment"
import UserHome from "../Pages/DashBoard/UserHome/UserHome"
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // users routes
            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            // Admin routes
            {
                path: 'adminhome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addItem',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            }
        ]
    }
])