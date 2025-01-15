import classes from '../css/Header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
	return (	
		<>
			<header className={classes.nav}>
				<Link to='/' className={classes.headerLink}>Blog</Link>
				<Link to='/contact' className={classes.headerLink}>お問い合わせ</Link>
			</header>
		</>
	);
};