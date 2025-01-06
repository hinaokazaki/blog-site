import { NavLink, Outlet } from 'react-router-dom';

export default function RouterNav() {
	return (
		<>
			<ul>
				<li><NavLink to="/main">Blog</NavLink></li>
				<li><NavLink to="/contact">お問い合わせ</NavLink></li>
			</ul>
			<Outlet />
		</>
	);
}

