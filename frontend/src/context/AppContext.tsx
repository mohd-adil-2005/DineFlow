// import { Children, useEffect, type ReactNode } from "react";
// import axios from "axios";
// import { authService } from "../main";
// const  { createContext, useContext, useState } from 'react';

//    import toast from "react-hot-toast";
// import type { AppContextType ,LocationData,User} from "../pages/types";


//     const AppContext=  createContext<AppContextType|undefined>(undefined);
//  interface AppProviderProps{
//     children:ReactNode;
//  }
//  export const AppProvider= ({children}: AppProviderProps)=>{
//     const [user, setUser] = useState<User | null>(null);
//     const[isAuth, setIsAuth]= useState(false);
//     const[loading , setLoading]= useState(true);
//     const [location, setLocation] = useState<LocationData | null>(null);
//     const[LoadingLocation, setLoadingLocation]= useState(false);
//     const [city, setCity]= useState("Fetching Location !");

//          async function fetchUser(){
//             try{
//    const token =localStorage.getItem("token");
//          if(!token){
//   setIsAuth(false);
//   setLoading(false); // IMPORTANT
//   return;
// }
            
//        const {data}= await axios.get(`${authService}/api/auth/me`,{
//         headers:{
//             Authorization:`Bearer ${token}`
//         }

//        })
//           setUser(data.user);
//           setIsAuth(true);

//             }
//             catch(error:any){
//                 console.log(error.message);
//             } finally{
//                 setLoading(false);
//             }
//          }
//          useEffect(()=>{
//              fetchUser()
//          },[]);

//          return (
//             <AppContext.Provider value={{ user,setIsAuth, isAuth, setLoading, setUser }}>
//                 {children}
//             </AppContext.Provider>
//          )

//  }


import { useEffect, type ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";
import { authService } from "../main";
import toast from "react-hot-toast";

import type { AppContextType, LocationData, User } from "../pages/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [LoadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching Location !");

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${authService}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error: any) {
      console.log(error?.message || error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, isAuth, setIsAuth, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};


export const UseAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UseAppData must be used within an AppProvider");
  }
  return context;
};
