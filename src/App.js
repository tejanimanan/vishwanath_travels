import logo from './logo.svg';
import './App.css';
import Home from './Componet/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/js/dist/carousel'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Navbar from './Componet/Navbar';
import Surat from './Componet/Surat';
import BusBooking from './Componet/BusBooking';
import { ToastContainer } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/surat' element={<Surat/>}></Route>
          <Route path='/bhavnagar' element={<Home/>}></Route>
          <Route path='/tana' element={<Home/>}></Route>
          <Route path='/talaja' element={<Home/>}></Route>
          <Route path='/bus/:busId' element={<BusBooking/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
