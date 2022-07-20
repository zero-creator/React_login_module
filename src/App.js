import {BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './component/Login'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
