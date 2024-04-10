
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../../assets/logo/infinite-insights.png'
import { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';

const Navbar = () => {

    const navLinks = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/allBlogs'}>All Blogs</NavLink></li>
        <li><NavLink to={'/featuredBlogs'}>Featured Blogs</NavLink></li>
        <li><NavLink to={'/wishlist'}>Wishlist</NavLink></li>
        <li><NavLink to={'/addBlog'}>Add Blog</NavLink></li>
    </>

    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <div className='flex items-center'>
                    <Link to={'/'}><img src={logo} alt="" /></Link>
                </div>


            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end ">
                {
                    user ?
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} className='flex hover:cursor-pointer bg-orange-400 text-white items-center gap-2 border p-2 rounded-xl'>
                                <p className='text-lg font-semibold'>{user?.displayName}</p>
                                <div className="avatar">
                                    <div className="w-12 mask mask-squircle">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                            </div>
                            <ul tabIndex={0} className="bg-orange-400 text-white font-semibold dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><button onClick={handleSignOut} className='hover:text-white'>Sign out</button></li>
                            </ul>
                        </div>
                        :
                        <div className="flex place-items-center">
                            <Link className="btn mr-1 relative" to={'/login'}>Login</Link>
                            <p className="font-medium relative">or</p>
                            <Link className="btn ml-1 relative" to={'/register'}>Register</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;