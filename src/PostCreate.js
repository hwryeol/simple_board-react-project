import { useRef,useState } from "react"
import { Navigate } from 'react-router-dom'
import styles from "./PostCreate.module.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5/build/ckeditor';


function CreatePost({isLogined}){
    const titleRef = useRef(null);

    let [insertId,setInsertID] = useState(0);
    const [contents,setContents] = useState("");
    const [isRedirectPost,setIsRedirectPost] = useState(false);
    
    function sendPost(){
        fetch(`/forums`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
              },
            body:JSON.stringify({
                title:titleRef.current.value,
                contents:contents
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
        <CKEditor
                    style={{height:"500px"}}
                    editor={ Editor }
                    data=""
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setContents(data);
                        console.log(contents);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
        <button onClick={sendPost}>등록</button>
        {isRedirectPost&&<Navigate to={`/forums/${insertId}`}/>}
    </div>
}

export default CreatePost;