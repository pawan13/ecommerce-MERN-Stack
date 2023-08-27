import './App.css';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';
import RegisterComplete from "./pages/auth/RegisterComplete"
import ForgotPassword from './pages/auth/ForgotPassword';


function App() {

  return (
      <>
      <Header/>
      <ToastContainer/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="register/complete" element={<RegisterComplete/>}/>
      <Route path="forgot/password" element={<ForgotPassword/>}/>
     </Routes>
      </>
  );
}
export default App;
