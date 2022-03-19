import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import {VscChevronLeft,VscChevronRight } from "react-icons/vsc";


function Home({isLogined, isLoding, setIsLoading}) {
  const [forumList,setForumList] = useState([]);
  const [userData,setUserData] = useState([]);
  const [forumsCount,setForumsCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [currentPageList,setCurrentPageList] = useState(1);

  const max_page = Math.ceil(forumsCount/10);
  

  function getForumList(){
    setIsLoading(true);
    fetch(`/forums/pages/${currentPage}`,{
      method:"get",
      headers:{
        withCredentials:true
      }
      
    }).then( res => {
      res.json().then(list => {
        setForumsCount(list[0][0].cnt);
        setForumList(list[1]);
        setIsLoading(false);
      })
    }
      );
      
  }
  useEffect(()=>{
    getForumList();
  },[currentPage]);

  const pagenation = () => {
    const result = [];
    const start = currentPageList-1;
    for (let i=(10*start)+1; i<=max_page && i<=10*(start+1); i++){
      result.push(<div className={i===currentPage?styles.selectPage:""} onClick={()=>{
        setCurrentPage(i);
      }}>{i}</div>)
    }
    return result;
  }

  const upPageList = () =>{
      setCurrentPageList(prev=>prev+1);
  }
  const downPageList = () =>{
    if(currentPageList>1){
      setCurrentPageList(prev=>prev-1);
    }
  }
  
    return (
      <>
     
      <div className={styles.boards}>
        <div className={styles.boards_title}>{`총 게시물 ${forumsCount}건 현재페이지 ${currentPage}/${max_page}`}</div>
        <table className={styles.boards_content_List}>
            <thead className={styles.boards_content_List_header}>
              <tr className={styles.boards_content_List_header_tr}>
                <th className={styles.boards_content_List_header_no}>번호</th>
                <th className={styles.boards_content_List_header_title}>제목</th>
                <th className={styles.boards_content_List_header_writer}>작성자</th>
                <th className={styles.boards_content_List_header_createAt}>날짜</th>
                <th className={styles.boards_content_List_header_viewCount}>조회수</th>
              </tr>
            </thead> 
            <tbody className={styles.boards_content_List_body}>
            {
            forumList.map(data=>{
              return (
              <tr className={styles.boards_content_List_body_tr} key={`forum_${data['no']}`}>
                  <td className={styles.boards_content_List_body_tr_no}>{data['no']}</td>
                  <td className={styles.boards_content_List_body_tr_title}>
                  <Link className={styles.boards_content_List_body_tr_title_link} to={`/forums/${data['no']}`}>
                    {data['title']}
                  </Link>
                  </td>
                  <td className={styles.boards_content_List_body_tr_writer}>{data['nickname']}</td>
                  <td className={styles.boards_content_List_body_tr_createAt}>{data['create_at'].slice(0,10)}</td>
                  <td className={styles.boards_content_List_body_tr_viewCount}>{data['view_count']}</td>     
              </tr>
              )
            })}
          </tbody>
          </table>
          <Link to="./postcreate">생성</Link>
          <div className={styles.container}>
            {currentPageList>1?<VscChevronLeft onClick={downPageList} className={styles.left_icon}/>:null}
            {pagenation()}
            {max_page!=0&&(currentPage>max_page || max_page>10) ?<VscChevronRight onClick={upPageList}  className={styles.right_icon}/>:null}
          </div>
      </div>
      </>
    );
  }
  
  export default Home;
  