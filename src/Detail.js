import { useEffect,useRef,useState } from "react";
import { Navigate } from 'react-router-dom'
import {useParams} from "react-router-dom"
import styles from "./Detail.module.css"



function Detail() {
    let {no} = useParams();
    let date;
    const [forumData,setForumData] = useState([]);
    const [currentSeq,setCurrentSeq] = useState(0);
    const [currentLvl,setCurrentLvl] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const [isRedirectHome,setIsRedirectHome] = useState(false);
    const [isRedirectLogin,setIsRedirectLogin] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [isReply,setIsReply] = useState(false);
    const [comments,setComments] = useState([]);
    const [maxseq,setMaxSeq] = useState(0);
    const comment_input = useRef(null);
    const reply_inputList = useRef([]);

    useEffect(()=> {
        fetch(`/forums/${no}`).then(res => res.json()).then(data=> {
            setForumData(data[0]);
            setIsLoading(false);
        });
        getComments();
    }, []);

    function deleteForum(){
        fetch(`/forums/${no}`,{method:"DELETE"}).then((response) => console.log(response));
        setIsRedirectHome(true);
    }
    function updateForum(){
        setIsUpdate(prev => !prev);
    }
    function getComments(){
        fetch(`/comments/${no}`).then(res=>res.json()).then(data=>{
            console.log(data);
            data.length>0&&setMaxSeq(data[data.length-1].seq)
            setComments(data);
        })
    }
    function createComments(){
        fetch(`/comments/${no}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                contents:comment_input.current.value,
                seq:maxseq+1,
                lvl:0
            })
        }).then(res=>{
            if(res.status === 401){
                alert("로그인이 필요합니다")
                setIsRedirectLogin(true);
            }
        })
        getComments();
    }
    function createReply(ref,seq,lvl){
        fetch(`/comments/${no}`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                contents:ref.value,
                seq:seq,
                lvl:lvl
            })
        }).then(res=>{
            if(res.status === 401){
                alert("로그인이 필요합니다")
                setIsRedirectLogin(true);
            }
        })
        getComments();
    }
    return (
        <div className={styles.detail}>
        {isLoading ? <h1>loading</h1>:<>
            <div className={styles.title}>{forumData.title}</div>
            <div className={styles.userData}>
            <div className={styles.userData_nickname}>{forumData.nickname}</div>&nbsp;&nbsp;&nbsp;&nbsp; <div className={styles.userData_createAt}>{forumData.forums_create_at.replace(/T|Z/g,' ').slice(0,19)}</div></div>
            <textarea className={[styles.contents,isUpdate&&styles.ddd].join(" ")} readOnly={!isUpdate}>{forumData.contents}</textarea>
            <div>
                <button onClick={updateForum} className={styles.forum_update}>수정</button>
                <button onClick={deleteForum} className={styles.forum_delete}>제거</button>
            </div>
            <div className={styles.comment_create}>
                <textarea ref={comment_input} className={styles.comment_create_input}></textarea>
                <button onClick={()=>{
                    createComments()
                }} className={styles.comment_create_button}>등록</button>
            </div>
            {comments.map((data,index)=>{
                return <div key={index} className={data.lvl>0?styles.reply:styles.comments} style={{left:`${(data.lvl)*40}px`}}>
                    <div className={styles.comments_contents} onClick={()=>setIsReply(prev=>!prev)}>{data.contents}</div>
                    <div className={styles.comments_nickname}>{data.nickname}</div>
                    <div className={styles.comments_create_at}>{data.create_at.replace(/T|Z/g," ")}</div>
                    <div className={isReply?"":styles.reply_form}>
                        <input ref={el=>reply_inputList.current[index] = el} type="text" className={styles.reply_input}></input>
                        <button className={styles.reply_input_button} onClick={(event)=>{
                            createReply(reply_inputList.current[index],data.seq,data.lvl+1);
                        }}>fafa</button>
                    </div>
                </div>
            })}
            {isRedirectHome&&<Navigate to="/"/>}
            {isRedirectLogin&&<Navigate to="/login"/>}
            </>
        }
        </div>
    );
  }
  
  export default Detail;
  