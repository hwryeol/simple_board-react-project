import { useEffect,useState} from "react";
import { Navigate } from 'react-router-dom'

function Profile() {
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

    function changeWriter(event){
      setNickname(event.target.value);
    }

    return (
      <div>
          <p>아이디:<input value={userData.id||''} disabled/></p>
          <p>닉네임:<input value={userData.nickname||''} disabled/></p>
          닉네임 변경:<input onChange={changeWriter} value={nickname||''}/>
          <button onClick={sendWriter}>클릭</button>
          {isRedirect&&<Navigate to="/"/>}
      </div>
    );
  }
  
  export default Profile;
  