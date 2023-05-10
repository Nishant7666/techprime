import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Login from './frontend/Component/Login'
import Contents from './frontend/Component/Contents';
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import RegProto from './frontend/Component/RegProto';



function App()
{
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>  
        <Routes>
            <Route exact path="*" element={isLoggedIn == "true" ? <Contents /> : <Login/>}/>         
            <Route exact path="/Login" element={<Login/>}/> 
            <Route exact path='/Contents' element={<Contents/>}/>
        </Routes>       
    </Router> 
   
  );
}

export default App;
