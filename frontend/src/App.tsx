
 import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';




export default function App() {
  return (
   <div className="font-sans">
     <BrowserRouter>
       <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />

       </Routes>
      
     </BrowserRouter>
   </div>
  );
}
