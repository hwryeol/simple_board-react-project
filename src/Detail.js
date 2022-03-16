import { useEffect,useRef,useState } from "react";
import { Navigate } from 'react-router-dom'
import {useParams} from "react-router-dom"
import styles from "./Detail.module.css"
import Comments from "./Comments"
import LoadingIcons from 'react-loading-icons'



function Detail() {
    let {no} = useParams();
    let date;


    const [forumData,setForumData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isRedirectHome,setIsRedirectHome] = useState(false);
    const [isRedirectLogin,setIsRedirectLogin] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [comments,setComments] = useState([]);
    const [maxseq,setMaxSeq] = useState(0);
    const comment_input = useRef(null);
    const [aaa,setaaa]=useState(false);

    useEffect(()=> {
        fetch(`/forums/${no}`).then(res => res.json()).then(data=> {
            setForumData(data[0]);
            setIsLoading(false);
        });
    }, []);

    function deleteForum(){
        fetch(`/forums/${no}`,{method:"DELETE"}).then((response) => console.log(response));
        setIsRedirectHome(true);
    }
    function updateForum(){
        setIsUpdate(prev => !prev);
    }
    function getMaxSeq(seq){
        setMaxSeq(seq)
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
            setaaa(prev=>!prev);
            if(res.status === 401){
                alert("로그인이 필요합니다")
                setIsRedirectLogin(true);
            }
        })
    }

    return (
        <div className={styles.detail}>
            
        {isLoading ? <h1>loading</h1>:<>
            
            <div className={styles.title}>{forumData.title}</div>
            <div className={styles.userData}>
            <div className={styles.userData_nickname}>{forumData.nickname}</div>&nbsp;&nbsp;&nbsp;&nbsp; <div className={styles.userData_createAt}>{forumData.forums_create_at.replace(/T|Z/g,' ').slice(0,19)}</div></div>
            <div style={{position:"relative",marginBottom:"10px",top:"10px",backgroundColor:"red",color:"#ddd",borderBottom:"1px solid"}}/>
            <textarea style={{height:"500px"}} className={[styles.contents,isUpdate?styles.ddd:""].join(" ")} readOnly={!isUpdate}>{forumData.contents}</textarea>
            <hr/>
                {/* <button onClick={deleteForum} className={styles.forum_delete}>제거</button> */}
                <button onClick={updateForum} className={styles.forum_update}>수정</button>
            <div className={styles.comments_create}>
                <textarea ref={comment_input} className={styles.comment_create_input}></textarea>
                <button onClick={()=>{
                    createComments()
                }} className={styles.comment_create_button}>등록</button>
            </div>
            
            <Comments no={no} setIsRedirectLogin={setIsRedirectLogin} getMaxSeq={getMaxSeq} aaa={aaa} />
            {isRedirectHome&&<Navigate to="/"/>}
            {isRedirectLogin&&<Navigate to="/login"/>}
            </>
        }
        </div>
    );
  }
  
  export default Detail;
  