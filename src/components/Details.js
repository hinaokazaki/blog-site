import React from 'react';
import { useParams } from 'react-router-dom';
import classes from '../css/Details.module.css';
import Categories from './Categories';
import Text from './Text';
import { useState, useEffect } from 'react';

export default function Details() {
  // useParams();でURLからidを取得する、
  const params = useParams();
  // params.idが文字列として渡されるのでnumber()で数値に変換
  const targetedId = Number(params.id); 

  // APIでデータを取得する際の状態管理
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${targetedId}`);
        // APIでデータがうまく受け取れなかった場合にエラーを投げる
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // 受け取ったデータをもとにpostsとisLoadingを更新
        const data = await res.json();
        setPost(data.post);
        setIsLoading(false); //　setPostにデータが入った段階でfalseとして画面の表示を切り替える
      
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetcher();
    
  }, [])
  
  // データが取得される間のローディング中の表示、早期リターン
  if (isLoading) 
    return <div>読み込み中...</div>

  return (
    <div className={classes.detailMain}>
      <div className={classes.detailBox}>
        <div><img className={classes.detailImg} src={post.thumbnailUrl} alt=""></img></div>
        <div className={classes.detailInfo}>
          <div className={classes.detailBoxNav}>
            <div className={classes.detailBoxNavDate}>{new Date(post.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
            <Categories categories={post.categories}/>
          </div>
          <div className={classes.homeBoxTexts}>
            <h1 className={classes.detailBoxTextsTitle}>APIで取得した{post.title}</h1>
            <Text content={post.content}/> 
          </div>
        </div>
      </div>
    </div>
  )
}