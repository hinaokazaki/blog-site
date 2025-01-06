import React from 'react';
import classes from './css/Main.module.css';

export default function MainPage({ src }) {
  const categoriesButton = (categories) => 
		categories.map((item, index) => 
		<button key={index} type="button" className={classes['categories-button']}>{item}</button>
		);

	// 本文のテキストに文字制限をかけた後にhtmlとして表示するようにする関数
	const maxLength = 60;
	const fixContentsLength = (content) => content.length > maxLength ? content.slice(0, maxLength) + " ..." : content;
	const text = (content) => {
		return <div dangerouslySetInnerHTML={{ __html: content}} />
	}

	return (
		src.map((elem) => (
			<React.Fragment key={elem.id}>  {/* 省略形の<></>にはkey属性をつけることはできない */}
				<div className={classes['home-box']}>
					<div className={classes['home-box-nav']}>
						<div className={classes['home-box-nav-date']}>{new Date(elem.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
						<div>{categoriesButton(elem.categories)}</div>
					</div>
					<div className={classes['home-box-texts']}>
						<h1 className={classes['home-box-texts-title']}>APIで取得した{elem.title}</h1>
						<p className={classes['home-box-texts-contents']}>{text(fixContentsLength(elem.content))}</p> 
					</div>
				</div>
			</React.Fragment>
		))
	);
}