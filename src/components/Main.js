import React from 'react';
import classes from '../css/Main.module.css';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Text from './Text';
import { useState, useEffect } from 'react';

export default function MainPage() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
			try {
				const res = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts');
      	// APIでデータがうまく受け取れなかった場合にエラーを投げる
				if (!res.ok) {
					throw new Error('HTTP error!');
				}
				const data = await res.json();
				// 受け取ったデータをもとにpostsを更新
      	setPosts(data.posts);
			} catch (error) {
				console.error('postのデータを読み込めませんでした', error);
			} finally {
				// setPostにデータが入ってエラーもない段階でfalseとして画面の表示を切り替える
				setIsLoading(false);
			}
    };

    fetcher();
  }, [])

	// 本文のテキストに文字制限をかけた後にhtmlとして表示するようにする関数
	const maxLength = 60;
	const fixContentsLength = (content) => content.length > maxLength ? content.slice(0, maxLength) + " ..." : content;

	// データが取得される間のローディング中の表示、早期リターン
	if (isLoading) 
		return <div className={classes.loadingMessage}>読み込み中...</div> 

	// ローディングが終わってpostsが空である時の表示、早期リターン
	if (!isLoading && posts.length === 0) 
		return <div className={classes.errorHandring}>記事が見つかりません。</div>

	return (
		posts.map((elem) => (
			<React.Fragment key={elem.id}>  {/* 省略形の<></>にはkey属性をつけることはできない */}
				<div className={classes.homeMain}>
					<div className={classes.homeBoxes}>
						<Link className={classes.postLink} to={`/posts/${elem.id}`} >
							<div className={classes.homeBox}>
								<div className={classes.homeBoxNav}>
									<div className={classes.homeBoxNavDate}>{new Date(elem.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
									<Categories categories={elem.categories}/>
								</div>
								<div className={classes.homeBoxTexts}>
									<h1 className={classes.homeBoxTextsTitle}>APIで取得した{elem.title}</h1>
									<Text content={fixContentsLength(elem.content)} />
								</div>
							</div>
						</Link>
					</div>
				</div>
			</React.Fragment>
		))
	);
}