import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './Components/Mynavbar'; 
import Home from './pages/Home';             
import Dashboard from './pages/Dashboard';   
import AuthForm from './pages/AuthForm';
 

function App() {
  return (
    <Router>
      <MyNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={ <AuthForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
