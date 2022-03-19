import Login from './Login';
import Home from './Home';
import Detail from './Detail';
import Profile from './Profile';
import Signup from './Signup';
import Header from './Header';
import PostCreate from './PostCreate';
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import { useEffect, useState } from "react";
import LoadingIcons from 'react-loading-icons'
import styles from "./App.module.css";

function App(){
  const [isLogined,setIsLogined] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  return (
    <div className="App">
       {isLoading&&<div className={styles.loading}><LoadingIcons.SpinningCircles/></div>}
      <BrowserRouter>
      <Header isLogined={isLogined} setIsLogined={setIsLogined}/>
        <Routes>
          <Route path="/" element={<Home isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
          <Route path="/login" element={<Login isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
          <Route path="/forums/:no" element={<Detail isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/profile" element={<Profile isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
          <Route path="/signup" element={<Signup isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
          <Route path="/postcreate" element={<PostCreate isLogined={isLogined} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
