import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
function Header(){
    const [isLogined,setIsLogined] = useState(false);
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
              setIsLogined(true);
              setUserData(list);
            })
          }
        })
      }
      function logOut(){
        fetch('/logout',{
            method:"POST",
            headers:{
              withCredentials:true
            }
          }).then( res => {
            if(res.status === 401){
              setIsLogined(false);
            }
          })
      }
    useEffect(()=>{
        getUserData();
    },[])


    return <div className={styles.header}>
    <Link className={styles.header_title} to="/">게시판</Link>
      <div>
      {isLogined?
        <><Link className={`${styles.header_link} ${styles.profile}`} to="/profile">닉네임 변경</Link><button onClick={logOut}>로그아웃</button><h2 className={styles.message}>{userData.nickname}님 환영합니다.</h2></> : <Link className={styles.nicu} to="/login">로그인</Link>
      }
      </div>
    </div>
}
export default Header;