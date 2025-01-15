import React from 'react';
import { useParams } from 'react-router-dom';
import classes from '../css/Details.module.css';


export default function Details({ src }) {
  const categoriesButton = (categories) => 
    categories.map((item, index) => 
    <button key={index} type="button" className={classes.categoriesButton}>{item}</button>
    ); 

  const text = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content}} />
  }

  const params = useParams();
  const targetedId = Number(params.id);
  const findPost = () => src.find((elem) => elem.id === targetedId);
  
  return (
    <>
      <div className={classes.detailMain}>
        <div className={classes.detailBox}>
          <div><img className={classes.detailImg} src={findPost().thumbnailUrl}></img></div>
          <div className={classes.detailInfo}>
            <div className={classes.detailBoxNav}>
              <div className={classes.detailBoxNavDate}>{new Date(findPost().createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
              <div>{categoriesButton(findPost().categories)}</div>
            </div>
            <div className={classes.homeBoxTexts}>
              <h1 className={classes.detailBoxTextsTitle}>APIで取得した{findPost().title}</h1>
              <p>{text(findPost().content)}</p> 
            </div>
          </div>
        </div>
      </div>
   </>
  )
}