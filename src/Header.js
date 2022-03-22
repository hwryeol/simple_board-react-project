import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

function Header({isLogined,setIsLogined, isLoading}){
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
      
      function logOut(){
      if(window.confirm("로그아웃 하겠습니까?")){
        fetch('/logout',{
            method:"POST",
            headers:{
              withCredentials:true
            }
          }).then( res => {
            setIsLogined(false);
          })
      }
      }
    useEffect(()=>{
        getUserData();
    },[])


    return <><div className={styles.header}>
      <Link className={styles.header_title} to="/">게시판</Link>
      {isLogined?
        <>
        <div  style={{display:"flex",flexDirection:"column"}}>
          <div className={styles.login_link}>
            <Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link>
            <button onClick={logOut}>로그아웃</button>
          </div>
        <h2 className={styles.message}>{userData.nickname}님 환영합니다.</h2>
        </div>
        </>:<>
        <div className={styles.logout_link} style={{display:"flex"}}>
        <Link to="/login">로그인</Link>
        <a href="/auth/google" onClick={()=>getUserData()}>fafa</a>
        <Link to="/signup">회원가입</Link>
        </div>
        </>
        
      }
    </div>
    <div className={styles.header_bar}></div>
    </>
    
}
export default Header;