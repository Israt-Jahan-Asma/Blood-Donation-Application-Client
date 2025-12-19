import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { Navigate } from 'react-router';


const PrivetRouter = ({children}) => {
    const{user, loading, roleLoading, userStatus} = useContext(AuthContext)
if(loading || roleLoading){
    return <p> Loading.....</p>
}
    if (!user || !userStatus == 'active'){
    return <Navigate to={'/login'}></Navigate>
}
    return children
};

export default PrivetRouter;