import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

function Header({isLogined,setIsLogined, isLoading,getUserData,userData,setUserData}){
    const [isBtnClick,setIsBtnClick] = useState(false);

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
        <button className={styles.userDropMenuBtn} onClick={()=>setIsBtnClick(prev => !prev)}>클릭</button>
        <div className={[isBtnClick&&styles.hidden,styles.header_links,styles.col].join(" ")}>
            <div className={styles.login_link}>
            <Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link>
            <button onClick={logOut}>로그아웃</button>
        </div>
          <div className={styles.message}>{userData.nickname}님 환영합니다.</div>
        </div>
        </>:<>
        <div className={styles.header_links}>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
        </>
        
      }
    </div>
    <div className={styles.header_bar}></div>
    </>
    
}
export default Header;