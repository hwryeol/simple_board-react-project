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

    useEffect(()=> {
        fetch(`/forums/${no}`).then(res => res.json()).then(data=> {
            setForumData(data[0]);
            setIsLoading(false);
        });
    }, []);

    function deleteForum(){
        fetch(`/forums/${no}`,{method:"DELETE"}).then((response) => console.log(response));
        setIsRedirect(true);
    }
    return (
        <div className={styles.detail}>
        {isLoading ? <h1>loading</h1>:<>
            <button onClick={deleteForum}>제거</button>
            <h1>{forumData.title} ({forumData.forums_create_at.replace(/T|Z/g,' ').slice(0,19)})</h1>
            <p>글쓴이:{forumData.nickname} 가입일: {forumData.user_create_at.replace(/T|Z/g,' ').slice(0,19)}</p>
            <p>{forumData.contents}</p>
            {isRedirect&&<Navigate to="/"/>}
            </>
        }
        </div>
    );
  }
  
  export default Detail;
  