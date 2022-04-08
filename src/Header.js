import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";


function Header({isLogined,setIsLogined, isLoading,getUserData,userData,setUserData}){
<<<<<<< HEAD
    const [isBtnClick,setIsBtnClick] = useState(false);
    const el = useRef();

=======
>>>>>>> parent of f601803 (feat: 사용자 정보를 버튼상태에 따라 보이는 기능추가)
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
<<<<<<< HEAD
        <CgProfile className={styles.userDropMenuBtn} onClick={()=>setIsBtnClick(true)}/>
        <div ref={el} className={[!isBtnClick&&styles.hidden,styles.header_login_links,styles.col].join(" ")}>
          <div className={styles.message}>{userData.nickname}</div>
          <Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link>
          <button className={styles.logout_btn} onClick={logOut}>로그아웃</button>
                 
=======
        <div className={[styles.header_links,styles.col].join(" ")}>
            <div className={styles.login_link}>
            <Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link>
            <button onClick={logOut}>로그아웃</button>
        </div>

        <div className={styles.message}>{userData.nickname}님 환영합니다.</div>
>>>>>>> parent of f601803 (feat: 사용자 정보를 버튼상태에 따라 보이는 기능추가)
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