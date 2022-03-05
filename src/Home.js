import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import Cookies from 'universal-cookie';
import {VscChevronLeft,VscChevronRight } from "react-icons/vsc";
import LoadingIcons from 'react-loading-icons'

function Home() {
  const [forumList,setForumList] = useState([]);
  const [userData,setUserData] = useState([]);
  const [forumsCount,setForumsCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [isLogined,setIsLogined] = useState(false);
  const [currentPageList,setCurrentPageList] = useState(1);

  const [isLoading,setIsLoading] = useState(true);

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
  function getUserData(){
    fetch('/profile',{
      method:"get",
      headers:{
        withCredentials:true
      }
    }).then( res => {
      if(res.status === 401){
        setIsLogined(false);
      }else{
        res.json().then(list => {
          setIsLogined(true);
          setUserData(list);
        })
      }
    })
  }
  useEffect(()=>{
    getForumList();
  },[currentPage]);

  useEffect(()=>{
    getUserData();
  },[]);

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
      {isLoading&&<div className={styles.loading}><LoadingIcons.SpinningCircles/></div>}
      <div className={styles.header}>
          <h2>게시판</h2>
            <div>
            {isLogined?
              <><Link className={`${styles.link} ${styles.profile}`} to="/profile">닉네임 변경</Link><h2 className={styles.message}>{userData.nickname}님 환영합니다.</h2></> : <Link to="/login">로그인</Link>
            }
            </div>
          </div>
      <div className={styles.boards}>
        <div>{`총 게시물 ${forumsCount}건 현재페이지 ${currentPage}/${max_page}`}</div>
        <table>
            <thead className="forumsList">
              <tr>
                <th className={styles.no}>번호</th>
                <th className={styles.title}>제목</th>
                <th className={styles.writer}>작성자</th>
                <th className={styles.regdate}>날짜</th>
                <th className={styles.viewcnt}>조회수</th>
              </tr>
            </thead>
            <tbody className="forumsList">
            {
            forumList.map(data=>{
              return (
              <tr key={`forum_${data['no']}`}>
                  <td className={styles.no}>{data['no']}</td>
                    <td className={styles.title}>
                    <Link className={styles.link} to={`/forums/${data['no']}`}>
                      {data['title']}
                    </Link>
                    </td>
                  <td className={styles.writer}>{data['nickname']}</td>
                  <td className={styles.regdate}>{data['create_at'].slice(0,10)}</td>
                  <td className={styles.viewcnt}>{data['view_count']}</td>     
              </tr>
              )
            })}
          </tbody>
          </table>
          <div className={styles.container}>
            {currentPageList>1?<VscChevronLeft onClick={downPageList} className={styles.left_icon}/>:null}
            {pagenation()}
            {currentPage>max_page || max_page>10 ?<VscChevronRight onClick={upPageList}  className={styles.right_icon}/>:null}
          </div>
      </div>
      </>
    );
  }
  
  export default Home;
  