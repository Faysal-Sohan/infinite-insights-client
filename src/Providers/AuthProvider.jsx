import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import PropTypes from 'prop-types';
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser) {
                const loggedUser = { email: currentUser.email };
                axios.post('https://infinte-insights-blog-server.vercel.app/jwt', loggedUser, { withCredentials: true })
                .then(res => console.log(res.data))
            }
            else {
                const loggedUser = { email: user?.email };
                axios.post('https://infinte-insights-blog-server.vercel.app/logout', loggedUser, { withCredentials: true })
                .then(res => console.log(res.data))
            }
            setUser(currentUser);
            setLoading(false);
            console.log('Current user', currentUser);
        })
        return () => unsubscribe();
    },[]);

    const createUser = (name, photo, email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const setProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }
    
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        setProfile,
        signIn,
        signInWithGoogle,
        logOut
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;