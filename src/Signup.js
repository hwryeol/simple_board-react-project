import {useState} from "react";
import styles from "./signup.module.css"

function Signup({isLogined}) {
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
            body:JSON.stringify(userData)
        }).then(res => {
            if(res.status === 200){
                alert("회원가입이 완료됐습니다.")
            }else if(res.status === 401){
                alert("회원가입이 되지 않았습니다.")
            }
        })
        console.log(userData);
    }
    }
    return (
      <div className={styles.signup}>
            <input className={styles.signup_id} name="id" placeholder="id" onChange={onChange} type="text" />
            <input className={styles.signup_nickname}name="nickname" placeholder="nickname" onChange={onChange} type="text" />
            <input className={styles.signup_password}name="password" placeholder="password" onChange={onChange} type="password" />
            <button className={styles.signup_submit}onClick={clickSignUpClick}>SignUp</button>
      </div>
    );
  }
  
  export default Signup;
  