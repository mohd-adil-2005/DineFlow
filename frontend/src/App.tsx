
 import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/protectedRoute.tsx";
import PublicRoute from "./components/publicRoute.tsx";
import SelectRole from './pages/SelectRole.tsx';



export default function App() {
  return (
   <div className="font-sans">
     <BrowserRouter>
       <Routes>
      <Route element ={<SelectRole/>} path="/select-role"/>
     <Route   element={<ProtectedRoute/>} >
        <Route path='/' element={<HomePage />} />
     </Route>


  <Route element ={<PublicRoute/>}> 
  <Route path='/login' element={<LoginPage />} />
  </Route>
      
      

       </Routes>
      
     </BrowserRouter>
   </div>
  );
}
