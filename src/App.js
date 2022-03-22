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
  const [userData,setUserData] = useState([]);

  function getUserData(){
    fetch('/profile',{
      method:"get",
      headers:{
        withCredentials:true
      }
    }).then( res => {
      if(res.status === 401){
        setIsLogined(false);
      }else{
        res.json().then(list => {
          console.log(list);
          setUserData(list);
          setIsLogined(true); 
        })
      }
    })
  }

  const props = {isLogined,setIsLogined,isLoading,setIsLoading,userData,setUserData,getUserData}

  return (
    <div className="App">
       {isLoading&&<div className={styles.loading}><LoadingIcons.SpinningCircles/></div>}
      <BrowserRouter>
      <Header {...props}/>
        <Routes>
          <Route path="/" element={<Home {...props} />}/>
          <Route path="/login" element={<Login {...props}/>} />
          <Route path="/forums/:no" element={<Detail {...props}/>}/>
          <Route path="/profile" element={<Profile {...props}/>} />
          <Route path="/signup" element={<Signup {...props}/>} />
          <Route path="/postcreate" element={<PostCreate {...props}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
