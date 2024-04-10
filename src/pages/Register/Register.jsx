import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {

    const { createUser, setProfile } = useContext(AuthContext);
    const [passwordValid, setPasswordValid] = useState(true);
    const [invalidText, setInvalidText] = useState('');

    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        if (password.length < 6) {
            setPasswordValid(false)
            setInvalidText('Password must be at least 6 characters!');
            return
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordValid(false)
            setInvalidText('Password must contain at least one Capital Letter')
            return
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordValid(false)
            setInvalidText('Password must contain at least one Special Character')
            return
        }
        setPasswordValid(true)
        setInvalidText('')

        createUser(name, photo, email, password)
            .then(result => {
                console.log(result)
                setProfile(name, photo)
                    .then(() => {

                        toast("Registered Successfully!")
                        navigate('/')
                    })
                    .catch(error => console.log('Set profile', error));

            })
            .catch(error => console.log('Create User Error', error));
    }

    return (
        <div className="mt-12 mb-24">
            <div className="flex md:flex-row flex-col items-center justify-center">
                <div className="md:w-1/2 w-full">
                    <h1 className="text-3xl font-bold text-center mb-3 lg:w-2/3">Please Register</h1>
                    <form onSubmit={handleRegister} className="card-body border shadow-lg rounded-lg lg:w-2/3 w-full">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="text" name="photo" placeholder="photo url" className="input input-bordered" required />
                        </div>
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
                            {
                                !passwordValid && <p className="text-sm text-red-500">{invalidText}</p>
                            }

                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn bg-orange-400 text-white normal-case" value={'Register'}></input>
                        </div>
                        <div className="text-sm mt-2">
                            <p>Already have an account? <Link to={'/login'} className="text-orange-400">Login here.</Link></p>
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

export default Register;