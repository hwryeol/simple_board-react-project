import { useEffect,useState} from "react";
import { Navigate } from 'react-router-dom'
import styles from "./profile.module.css"

function Profile({isLogined}) {
    const [userData,setUserData] = useState([]);
    const [isRedirect,setIsRedirect] = useState(false);
    const [nickname,setNickname] = useState("");
    useEffect(()=>{
        fetch('/profile').then(data => {
                data.json().then(data=>{
                        setUserData(data);
                    })
            })
    },[])


    function confirmWrapper(func,msg){
      if(window.confirm(msg)){
        func();
      }
    }


    function sendWriter(){
      fetch('/profile',{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname:nickname
        })
      }).then((response) => console.log(response));
      setIsRedirect(true);
    }

    return (
      <div className={styles.profile}>
          <p>아이디:<input value={userData.id||''} disabled/></p>
          <p>닉네임:<input value={userData.nickname||''} disabled/></p>
          닉네임 변경:<input onChange={e=>setNickname(e.target.value)} value={nickname||''}/>
          <button onClick={()=>confirmWrapper(sendWriter,"닉네임을 변경하겠습니까?")}>클릭</button>
          {isRedirect&&<Navigate to="/"/>}
      </div>
    );
  }
  
  export default Profile;
  