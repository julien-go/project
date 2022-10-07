import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Disconnect from '../components/Disconnect'
import Admin from '../components/Admin'
import ModifyAvatar from '../components/ModifyAvatar'
import Error404 from '../components/Error404'
import Profile from '../components/Profile'
import ModifyProfile from '../components/ModifyProfile'
import DeleteAccount from '../components/DeleteAccount'

import AddPost from '../components/AddPost'

export const routes = [
    {path: '/', element: <Home />},
    {path: '/register', element: <Register/>},
    {path: '/login', element: <Login />},
    {path: '/disconnect', element: <Disconnect/>},
    {path: '/admin', element: <Admin/>},
    {path: "*", element: <Error404 />},
    {path: "/modify-avatar", element: <ModifyAvatar />},
    {path: "/modify-profile", element: <ModifyProfile />},
    {path: '/profile/:username', element: <Profile />},
    {path: '/delete-account', element: <DeleteAccount />},
    {path: '/add-post', element: <AddPost />},
    
    
]

export const userPath = [
    '/home',
    '/disconnect',
    '/modify-avatar',
    '/profile/:username',
    "/modify-profile",
    '/delete-account',
    '/add-post'
]

export const adminPath = [
    "/admin"
]

export const notConnectedPath = [
    "/register",
    "/login"
]