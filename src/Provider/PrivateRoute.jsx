import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    if (loading) {
        return <h2 className='loading loading-bars loading-lg'></h2>
    }
    if(!status==='active'){
         return <Navigate to="/login" state={location.pathname }></Navigate>
    }
    if (user && user?.email) {
        return children;
    }else{
        return <Navigate to="/login" state={location.pathname }></Navigate>
    }
};

export default PrivateRoute;