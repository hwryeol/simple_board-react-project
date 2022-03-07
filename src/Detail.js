import { useEffect,useState } from "react";
import { Navigate } from 'react-router-dom'
import {useParams} from "react-router-dom"
import styles from "./Detail.module.css"



function Detail() {
    let {no} = useParams();
    let date;
    const [forumData,setForumData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isRedirect,setIsRedirect] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [comments,setComments] = useState([]);

    useEffect(()=> {
        fetch(`/forums/${no}`).then(res => res.json()).then(data=> {
            setForumData(data[0]);
            setIsLoading(false);
        });
        getComments();
    }, []);

    function deleteForum(){
        fetch(`/forums/${no}`,{method:"DELETE"}).then((response) => console.log(response));
        setIsRedirect(true);
    }
    function updateForum(){
        setIsUpdate(prev => !prev);
    }
    function getComments(){
        fetch(`/comments/${no}`).then(res=>res.json()).then(data=>{
            console.log(data);
            setComments(data);
        })
    }
    return (
        <div className={styles.detail}>
        {isLoading ? <h1>loading</h1>:<>
            <div className={styles.title}>{forumData.title}</div>
            <div className={styles.userData}>{forumData.nickname}&nbsp;&nbsp;&nbsp;&nbsp; {forumData.forums_create_at.replace(/T|Z/g,' ').slice(0,19)}</div>
            <textarea className={[styles.contents,isUpdate&&styles.ddd].join(" ")} readOnly={!isUpdate}>{forumData.contents}</textarea>
            <button onClick={updateForum} className={styles.update}>수정</button>
            <button onClick={deleteForum} className={styles.delete}>제거</button>
            
            {comments.map((data,index)=>{
                return <div key={index} className={styles.comments}>{data.contents}</div>
            })}
            {isRedirect&&<Navigate to="/"/>}
            </>
        }
        </div>
    );
  }
  
  export default Detail;
  