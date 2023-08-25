import './App.css';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import {Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';

function App() {

  return (
      <>
      <Header/>
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
     </Routes>
      </>
  );
}
export default App;
