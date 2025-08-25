import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children,role}) => {
     const {loggedInUser}=useContext(AuthContext);


     if(!loggedInUser){
      return <Navigate to='/login' replace/>
     }

     if(role && loggedInUser.role !==role){
      return <Navigate to ='/' replace/>
     }
   return children;
};

export default ProtectedRoutes
