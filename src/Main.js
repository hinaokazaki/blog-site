import React from 'react';
import './css/Main.css';

export default function MainPage({ src }) {
    //
    const categoriesButton = (categories) => 
        categories.map((item, index) => 
        <button key={index} type="button" className="categories-button">{item}</button>
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
                <div className="home-box">
                    <div className="home-box-nav">
                        <div className="home-box-nav-date">{new Date(elem.createdAt).toLocaleDateString()}</div> {/* newとDateで新しいDateオブジェクトを作成してそれにtoLocaleDateString()メソッドを使って日付の表示を変更した */}
                        <div>{categoriesButton(elem.categories)}</div>
                    </div>
                    <div className="home-box-texts">
                        <h1 className="home-box-texts-title">APIで取得した{elem.title}</h1>
                        <p className="home-box-texts-contents">{text(fixContentsLength(elem.content))}</p> 
                    </div>
                </div>
            </React.Fragment>
        ))
    );
}