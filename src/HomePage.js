import React from 'react';
// import RoutesLink from './RoutesLink';
import Main from './Main';
import { posts } from './data/posts';
import Nav from './Nav';

function HomePage() {
    return (
        <div>
            <header>
                {/* <RoutesLink /> */}
                <Nav />
            </header>
            <main id='main'>
                <Main src={posts} />
            </main>
        </div>
    );
}

export default HomePage;