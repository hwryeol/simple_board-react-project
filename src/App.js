import Login from './Login';
import Home from './Home';
import Detail from './Detail';
import Profile from './Profile';
import Signup from './Signup';
import Header from './Header';
import './App.css';
import {Route,Routes, BrowserRouter} from 'react-router-dom'

function App(){
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/forums/:no" element={<Detail/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
