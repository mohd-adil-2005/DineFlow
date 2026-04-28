import {Navigate, Outlet } from 'react-router-dom';



import { UseAppData } from '../context/AppContext';


const PublicRoute=()=>{
    const{isAuth, loading}= UseAppData();
    if(loading) return null;
    return isAuth ?<Navigate to="/" replace/>:<Outlet/>
}
export default PublicRoute;