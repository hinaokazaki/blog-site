import React from 'react';
import classes from '../css/Main.module.css';
import { Link } from 'react-router-dom';


export default function MainPage({ src }) {
	// カテゴリーボタンを作成する関数
  const categoriesButton = (categories) => 
		categories.map((item, index) => 
		<button key={index} type="button" className={classes.categoriesButton}>{item}</button>
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
				<div className={classes.homeMain}>
					<div className={classes.homeBoxes}>
						<Link className={classes.postLink} to={`/posts/${elem.id}`} >
							<div className={classes.homeBox}>
								<div className={classes.homeBoxNav}>
									<div className={classes.homeBoxNavDate}>{new Date(elem.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
									<div>{categoriesButton(elem.categories)}</div>
								</div>
								<div className={classes.homeBoxTexts}>
									<h1 className={classes.homeBoxTextsTitle}>APIで取得した{elem.title}</h1>
									<p>{text(fixContentsLength(elem.content))}</p> 
								</div>
							</div>
						</Link>
					</div>
				</div>
			</React.Fragment>
		))
	);
}