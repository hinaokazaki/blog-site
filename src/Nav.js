import react from 'react';
import classes from './css/Nav.module.css'

export default function Nav() {
	return (	
		<>
			<div className={classes.nav}>
				<ul>
					<li><a href="/">Blog</a></li>
					<li><a href="contact">お問い合わせ</a></li>
				</ul>
			</div>
		</>
	);
};