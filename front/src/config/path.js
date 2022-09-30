import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Disconnect from '../components/Disconnect'
import Admin from '../components/Admin'
import Error404 from '../components/Error404'

export const routes = [
    {path: '/', element: <Home />},
    {path: '/register', element: <Register/>},
    {path: '/login', element: <Login />},
    {path: '/disconnect', element: <Disconnect/>},
    {path: '/admin', element: <Admin/>},
    {path: "*", element: <Error404 />}
]

export const userPath = [
    '/home',
    '/disconnect'
]

export const adminPath = [
    "/admin"
]

export const notConnectedPath = [
    "/register",
    "/login"
]