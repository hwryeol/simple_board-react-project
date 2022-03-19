import { useRef,useState } from "react"
import { Navigate } from 'react-router-dom'
import styles from "./PostCreate.module.css"

function CreatePost({isLogined}){
    const titleRef = useRef(null);
    const contentsRef = useRef(null);

    let [insertId,setInsertID] = useState(0);
    const [isRedirectPost,setIsRedirectPost] = useState(false);
    
    function sendPost(){
        fetch(`/forums`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                title:titleRef.current.value,
                contents:titleRef.current.value
            })
        }).then(res=>{
            if(res.status === 401){
                alert("로그인이 필요합니다")
            }
            res.json().then(data=>{
                setInsertID(data.insertId);
                setIsRedirectPost(prev => !prev);
            })
        })
    }
    return <div className={styles.createPost}>
        <input className={styles.title} placeholder="제목을 입력하세요" ref={titleRef}></input>
        <hr></hr>
        <textarea className={styles.contents} ref={contentsRef}></textarea>
        <button onClick={sendPost}>등록</button>
        {isRedirectPost&&<Navigate to={`/forums/${insertId}`}/>}
    </div>
}

export default CreatePost;