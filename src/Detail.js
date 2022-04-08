import { useEffect,useRef,useState } from "react";
import { Navigate } from 'react-router-dom'
import {useParams} from "react-router-dom"
import styles from "./Detail.module.css"
import Comments from "./Comments"
import LoadingIcons from 'react-loading-icons'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5/build/ckeditor';



function Detail({isLogined, isLoading, setIsLoading,getUserData}) {
    let {no} = useParams();
    let date;


    const [forumData,setForumData] = useState([]);
    const [isRedirectHome,setIsRedirectHome] = useState(false);
    const [isRedirectLogin,setIsRedirectLogin] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [comments,setComments] = useState([]);
    const [maxseq,setMaxSeq] = useState(0);
    const comment_input = useRef(null);
    const contents_input = useRef(null);
    const [aaa,setaaa]=useState(false);
    const [title,setTitle] = useState("");
    const [contents,setContents] = useState("");


    useEffect(()=> {
        setIsLoading(true);
        getForumData();
        getUserData();
    }, []);

    function getForumData(){
        fetch(`/forums/${no}`).then(res => res.json()).then(data=> {
            setForumData(data[0]);
            setTitle(data[0].title);
            setContents(data[0].contents);
            setIsLoading(false)
            
        }).then();
    }

    function deleteForum(){
        if(window.confirm("게시물을 삭제하겠습니까?")){
            fetch(`/forums/${no}`,{method:"DELETE"}).then((res) => { 
                if(res.status === 401){
                    alert("로그인이 필요합니다")
                    setIsRedirectLogin(true);
                }
                if(res.status === 403){
                    alert("수정한 권한이 없습니다");
                    getForumData();
                }
                if(res.status === 200){
                    alert("삭제되었습니다.")
                    setIsRedirectHome(true);
                }
                
            });

        }
    }
    
    function updateForum(){
        if(window.confirm("내용을 변경하겠습니까?") ){
            fetch(`/forums/${no}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json"
                  },
                body:JSON.stringify({
                    title:title,
                    // contents:contents_input.current.value
                    contents:contents
                })    
            }).then((res) =>{
                if(res.status === 401){
                    alert("로그인이 필요합니다")
                    setIsRedirectLogin(true);
                }
                if(res.status === 403){
                    alert("수정한 권한이 없습니다");
                    getForumData();
                }
            });
        }
        setIsUpdate(false);
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

    return (<>
    {isLoading?<></>:<div className={styles.detail}>
            <input className={styles.title} style={isUpdate?{border:"1px solid"}:{}} readOnly={!isUpdate} value={title} onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
            <div className={styles.userData}>
            <div className={styles.userData_nickname}>{forumData.nickname}</div>&nbsp;&nbsp;&nbsp;&nbsp; <div className={styles.userData_createAt}>{forumData.forums_create_at?.replace(/T|Z/g,' ').slice(0,19)}</div></div>
            <div style={{position:"relative",marginBottom:"10px",top:"10px",backgroundColor:"red",color:"#ddd",borderBottom:"1px solid"}}/>
            <div className={isUpdate?"":styles.hidden}>
            <CKEditor
                    editor={ Editor }
                    data={contents}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setContents(data);
                    }}
                />
            </div>
            <div className={isUpdate?styles.hidden:""} dangerouslySetInnerHTML={{__html:`${contents}`}} />
            <div className={styles.forum_process_menu}>
                <button onClick={()=>setIsUpdate(prev=> !prev)} className={[!isLogined&&styles.hidden, isUpdate?styles.hidden:styles.forum_update].join(" ")}>수정</button>
                <button onClick={updateForum} className={[!isLogined&&styles.hidden,isUpdate?styles.forum_update:styles.hidden].join(" ")}>적용</button>
                <button onClick={deleteForum} className={[!isLogined&&styles.hidden, styles.forum_delete].join(" ")}>제거</button>
            </div>
            <Comments no={no} setIsRedirectLogin={setIsRedirectLogin} getMaxSeq={getMaxSeq} aaa={aaa} isLogined={isLogined} />
            <div className={isLogined?styles.comments_create:styles.hidden}>
                <textarea ref={comment_input} className={styles.comment_create_input} placeholder="댓글을 입력하세요. &#13;&#10;shift+enter로 줄바꿈 가능합니다."></textarea> 
                <button onClick={()=>{
                    createComments()
                }} className={styles.comment_create_button}>등록</button>
            </div>
            {isRedirectHome&&<Navigate to="/"/>}
            {isRedirectLogin&&<Navigate to="/login"/>}
        </div>}
    
    </>
    );
}
  
export default Detail;
  