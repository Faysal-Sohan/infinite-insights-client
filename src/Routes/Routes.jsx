import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AddBlog from '../pages/AddBlog/AddBlog';
import PrivateRoute from './PrivateRoute';
import AllBlogs from '../pages/AllBlogs/AllBlogs';
import BlogDetails from '../pages/BlogDetails/BlogDetails';
import UpdateBlog from '../pages/UpdateBlog/UpdateBlog';
import FeauturedBlogs from '../pages/FeaturedBlogs/FeauturedBlogs';
import Wishlist from '../pages/Wishlist/Wishlist';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addBlog',
                element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
            },
            {
                path: '/allBlogs',
                element: <PrivateRoute><AllBlogs></AllBlogs></PrivateRoute>
            },
            {
                path: '/blogDetails/:id',
                element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>
            },
            {
                path: '/updateBlog/:id',
                element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>
            },
            {
                path: '/wishlist',
                element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
            },
            {
                path: '/featuredBlogs',
                element: <PrivateRoute><FeauturedBlogs></FeauturedBlogs></PrivateRoute>
            }
        ],
    }
])