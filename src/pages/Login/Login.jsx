import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";
import { FaGoogle } from 'react-icons/fa';

const Login = () => {

    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        signIn(email, password)
            .then(result => {
                console.log(result);
                toast("Logged in successfully!")
                location?.state ? navigate(location.state) : navigate('/')
            })
            .catch(error => toast(error.message))
    }

    const handleGoogleSignIn = e => {
        e.preventDefault();
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                toast("Logged in successfully!")
                location?.state ? navigate(location.state) : navigate('/')
            })
            .catch(error => {
                toast(error.message)
            })
    }

    return (
        <div className="mt-12 mb-24">
            <div className="flex md:flex-row flex-col items-center justify-center">
                <div className="md:w-1/2 w-full">
                    <h1 className="text-3xl font-bold text-center mb-3 lg:w-2/3">Please Login</h1>
                    <form onSubmit={handleLogin} className="card-body border shadow-lg rounded-lg lg:w-2/3 w-full">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn bg-orange-400 text-white normal-case" value={'Login'}></input>
                        </div>
                        <div className="text-black">
                            <p>New to Infinite Insights? <Link to={'/register'} className="text-pink-500">Register here.</Link></p>
                            <p className="text-center my-2 font-medium">Or</p>
                            <button onClick={handleGoogleSignIn} className="border border-red-400 w-full py-2 rounded-xl font-medium flex items-center justify-center  gap-2">
                                <FaGoogle></FaGoogle>Login with Google</button>
                        </div>
                    </form>
                </div>
                <div className="md:w-1/2 w-full">
                    <img src="https://i.ibb.co/zJ6rQkH/Login.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;