import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const PrivateRoute = ({children}) => {

    const { loading, user } = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <div className="container mx-auto h-screen flex place-content-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if(user) {
        return children;
    }

    return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;