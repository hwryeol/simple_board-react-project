import styles from "./Comments.module.css";
import {Link} from "react-router-dom";
import { useEffect,useRef, useState } from "react";

function Comments({no,setIsRedirectLogin,getMaxSeq,aaa}){
    const [isReplyList,setIsReplyList] = useState([]);
    const [comments,setComments] = useState([]);
    const reply_inputList = useRef([]);

    function getComments(){
        fetch(`/comments/${no}`).then(res=>res.json()).then(data=>{
            const commentsData = data;
            commentsData.length>0&&getMaxSeq(commentsData[ commentsData.length-1].seq)
            setComments(data);  
            setIsReplyList(Array.from({length: commentsData.length},()=>false));
            
        })
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
            getComments()
        })
        
    }
    useEffect(()=>{
        getComments();
    },[aaa])

    return <>{comments.map((data,index)=>{
        return <><div key={`commentsList${index}`} className={data.lvl>0?styles.reply:styles.comments} style={{left:`${(data.lvl)*20}px`}}>
            <div style={{display:"flex"}}>
                <div className={styles.comments_nickname}>{data.nickname}</div>
                <div className={styles.comments_contents} onClick={()=>{
                    const newReplyList = isReplyList.map((data,idx)=>{
                        if(idx === index){
                            return !data
                        }
                    });
                    setIsReplyList(newReplyList)
                }}>{data.contents}</div>
                <div className={styles.comments_create_at}>{data.create_at.replace(/T|Z/g,' ').slice(5,19)}</div>
            </div>
        </div>
        <div className={isReplyList[index]?styles.reply_form:[styles.reply_form,styles.hidden].join(" ")}>
        <textarea placeholder="답글을 입력하세요" ref={el=>reply_inputList.current[index] = el} type="text" className={styles.reply_input}></textarea>
        <button className={styles.reply_input_button} onClick={(event)=>{
            createReply(reply_inputList.current[index],data.seq,data.lvl+1);
        }}>등록</button>
    </div></>
    })}
    </>
}
export default Comments;