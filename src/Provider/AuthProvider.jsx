import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth,  onAuthStateChanged, signInWithEmailAndPassword,signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';

const auth=getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //console.log(user);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // const loginWithGoogle = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, googleProvider);
    // }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUser = async (updatedData) => {
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, updatedData);
        setUser({ ...auth.currentUser });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [])
    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        logIn,
        loading,
        setLoading,
        updateUser,
    };

    return <AuthContext.Provider value={authData}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;