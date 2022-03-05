import {useState} from "react";

function Signup() {
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
            alert("똑바로 입력하세요");
        }
        fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify(userData)
        })
        console.log(userData);
    }
    return (
      <div>
          <form action="/signup" method="post">
            <input name="id" onChange={onChange} type="text" />
            <input name="writer" onChange={onChange} type="text" />
            <input name="password" onChange={onChange} type="text" />
            <input type="submit" onClick={clickSignUpClick} value="SignUp" />
          </form>
      </div>
    );
  }
  
  export default Signup;
  