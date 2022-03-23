import { useRef,useState } from "react"
import { Navigate } from 'react-router-dom'
import styles from "./PostCreate.module.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    const [imgBase64,setImgBase64] = useState([]);
    const [imgFile,setImgFile] = useState(null);
    function handleChangeFile(event){
        console.log(event.target.files);
        setImgFile(event.target.files);
        for(let i=0; i<event.target.files.length;i++){
            if(event.target.files[i]){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onloadend = () => {
                    const base64 = reader.result;
                    console.log(base64)
                    if(base64){
                        let base64Sub = base64.toString()
                        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);

                    }
                }
            }
        }

    }
    return <div className={styles.createPost}>
        <input className={styles.title} placeholder="제목을 입력하세요" ref={titleRef}></input>
        <hr></hr>
        <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
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
        {/* <div contentEditable="true" className={styles.contents} ref={contentsRef}>
        {imgBase64.map((item) => {
        return(
            <img
            src={item}
            alt="First slide"
            />
        )
         })}
        </div> */}
        <input type="file" id="file" onChange={handleChangeFile} multiple/>
        <button onClick={sendPost}>등록</button>
        {isRedirectPost&&<Navigate to={`/forums/${insertId}`}/>}
    </div>
}

export default CreatePost;