import {Link,Navigate} from "react-router-dom"
import {useState,useEffect} from "react"
import styles from "./Login.module.css";
import sha256 from "sha256";
import googleLoginBtn from "./asset/googleLogin.png"


function Login({setIsLogined,getUserData}) {
  const [isRedirect,setIsRedirect] = useState(false);
  const [userData,setUserData] = useState([]);

  useEffect(()=>{
    getUserData();
  },[])

  function onClickSubmit(event){
    event.preventDefault();
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
      if(response.status === 401){
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
      else{
        getUserData();
        setIsLogined(true);
      }
    });
    setIsRedirect(true);
  }
  function onChangeUserData(event){
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      <div className={styles.form}>
        로그인
        <input className={styles.id} name="id" type="text" onChange={onChangeUserData}/>
        <input className={styles.password} name="password" type="password" onChange={onChangeUserData}/>
        <input className={styles.submit} type="button" onClick={onClickSubmit} value="로그인" />
        <Link to="/signup">회원가입을 아직 안하셨나요?</Link>
        <a href="/auth/google" onClick={()=>getUserData()}>
          <div>구글로그인</div>
          </a>
      </div>
        
        {isRedirect&&<Navigate to="/"/>}
    </div>
  );
}

export default Login;
