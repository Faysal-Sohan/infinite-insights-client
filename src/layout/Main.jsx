import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/shared/Navbar/Navbar";
import Footer from "../pages/Home/shared/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    return (
        <>
            <div className="container mx-auto">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </>
    );
};

export default Main;