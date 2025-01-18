import React from 'react';
import Main from './Main';
import { posts } from '../data/posts';

function HomePage() {
	return (
		<div>
			<main id='main'>
				<Main src={posts} />
			</main>
		</div>
	);
}

export default HomePage;