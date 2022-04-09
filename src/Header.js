import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";


function Header({isLogined,setIsLogined, isLoading,getUserData,userData,setUserData}){
    const [isBtnClick,setIsBtnClick] = useState(false);
    const el = useRef();

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
  
  useEffect(()=>{
    const dropDownMenuHandler = (e) => {
      if(isBtnClick && !el.current.contains(e.target)) setIsBtnClick(false);
    }
    window.addEventListener('click',dropDownMenuHandler);
    return () => window.removeEventListener("click",dropDownMenuHandler);
  },[isBtnClick])


    return <><div className={styles.header}>
      <Link className={styles.header_title} to="/">게시판</Link>
      {isLogined?
        <>
        <CgProfile className={styles.userDropMenuBtn} onClick={()=>setIsBtnClick(true)}/>
        <div ref={el} className={[!isBtnClick&&styles.hidden,styles.header_login_links,styles.col].join(" ")}>
          <div className={styles.message}>{userData.nickname}</div>
          <Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link>
          <button className={styles.logout_btn} onClick={logOut}>로그아웃</button>
                 
        </div>
        </>:<>
        <div className={styles.header_logout_links}>
          <Link className={styles.loginBtn} to="/login">로그인</Link>
          <Link className={styles.signupBtn} to="/signup">회원가입</Link>
        </div>
        </>
        
      }
    </div>
    <div className={styles.header_bar}></div>
    </>
    
}
export default Header;