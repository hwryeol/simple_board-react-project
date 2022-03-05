import {Link,Navigate} from "react-router-dom"
import {useState} from "react"
import styles from "./Login.module.css";


function Login() {
  const [isRedirect,setIsRedirect] = useState(false);
  const [userData,setUserData] = useState([{
    id:"",
    password:""
  }]);

  function onClickSubmit(event){
    event.preventDefault();
    fetch(`/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(userData),
    }).then((response) => console.log(response));
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
      
      <form className={styles.form}>
        로그인
        <input className={styles.id} name="id" type="text" onChange={onChangeUserData}/>
        <input className={styles.password} name="password" type="password" onChange={onChangeUserData}/>
        <input className={styles.submit} type="submit" onClick={onClickSubmit} value="로그인" />
        <Link to="/signup">회원가입을 아직 안하셨나요?</Link>
      </form>
        
        {isRedirect&&<Navigate to="/"/>}
    </div>
  );
}

export default Login;
