import React from 'react';
import { useParams } from 'react-router-dom';
import classes from '../css/Details.module.css';
import Categories from './Categories';

export default function Details({ src }) {
  const params = useParams();
  const targetedId = Number(params.id);
  const post = src.find((elem) => elem.id === targetedId);
  
  const Text = ({content}) => {
    return <div dangerouslySetInnerHTML={{ __html: content}} />
  } 

  return (
    <>
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
   </>
  )
}