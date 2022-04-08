import {useState} from "react";
import { Navigate } from 'react-router-dom'
import styles from "./signup.module.css"
import sha256 from "sha256";

function Signup({isLogined,getUserData,setIsLogined}) {
    const [isRedirect,setIsRedirect] = useState(false);
    const [userData,setUserData] = useState({
        id:"",
        password:"",
        nickname:"",
    });

    function onChange(event){
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }


    function clickSignUpClick(event){
        event.preventDefault();
        if(!userData.id && !userData.password && !userData.writer){
            alert("빈 칸이 들어가면 안됩니다. 다시 입력하세요");
        }else{
        fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                id:userData.id,
                password:sha256(userData.password),
                nickname:userData.nickname
            })
        }).then(res => {
            if(res.status === 200){
                alert("회원가입이 완료됐습니다.")
                fetch(`/login`,{
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json",
                    },
                    body:JSON.stringify({
                    id:userData?.id,
                    password:sha256(userData?.password)
                    }),
                }).then((response) =>{
                    getUserData();
                    setIsLogined(true);
                });
                setIsRedirect(true);
            }else if(res.status === 401){
                alert("회원가입이 되지 않았습니다.")
            }
        })
    }
    }
    return (
      <div className={styles.signup}>
            <input className={styles.signup_id} name="id" placeholder="id" onChange={onChange} type="text" />
            <input className={styles.signup_nickname}name="nickname" placeholder="nickname" onChange={onChange} type="text" />
            <input className={styles.signup_password}name="password" placeholder="password" onChange={onChange} type="password" />
            <button className={styles.signup_submit}onClick={clickSignUpClick}>SignUp</button>
            {isRedirect&&<Navigate to="/"/>}
      </div>
    );
  }
  
  export default Signup;
  