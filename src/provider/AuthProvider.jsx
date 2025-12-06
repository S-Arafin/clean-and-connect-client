import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider;
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle =() =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
   }
   const resetPass = (email) =>{
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
   }
   const updateUser = (updateData) =>{
    return updateProfile(auth.currentUser, updateData)
   }
   const logout = ()=>{
    return signOut(auth)
   }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    const authInfo = {
        createUser,
        signIn,
        signInWithGoogle,
        resetPass,
        updateUser,
        user,
        loading,
        logout
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;