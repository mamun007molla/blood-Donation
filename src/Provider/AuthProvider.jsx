import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, {  createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext =createContext();
const Authprovider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true);
    const [roleLoading,setRoleLoading]=useState(true);
    const [role,setRole]=useState('')
    const [status,setStatus]=useState('')
    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
        
    };

    // signin user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // create a user with google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };
    // forget password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    
    
   
    // observe auth state change

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((currentUser)=>{
            setUser(currentUser);
            setLoading(false);
            
        });
        
        return ()=>{
            unsubscribe();
        }
    },[])
     useEffect(()=>{
        if(!user)return;
        console.log(user);
        axios.get(`http://localhost:3000/users/role/${user.email}`)
            .then(res=>{
                console.log(res.data.role);
                
                setRole(res.data.role)
                setStatus(res.data.status)
                setLoading(false);
                setRoleLoading(false);

            })
    },[user])
    console.log(role);
    // sign out user
    const signOutUser = () => {
        return auth.signOut();
    };
    const authData = {
        user,
        setUser,
        createUser,
        signInUser,
        signOutUser,
        loading,
        setLoading,
        signInWithGoogle,
        resetPassword,
        role,
        roleLoading,
        setRoleLoading,
        status,
        setStatus

    
    }
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default Authprovider;