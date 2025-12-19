import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebase.config'
import axios from 'axios';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(true)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus]= useState('')

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (profile)=>{
        return updateProfile(auth.currentUser, profile)
    }
    const resetPass = (email)=>{
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    //observe user state
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(()=>{
        if(!user) return
        axios.get(`http://localhost:3000/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
    }, [user])


    
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        resetPass,
        role,
        roleLoading,
        userStatus
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;