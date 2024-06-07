import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

import './LayoutStyle.css';
const Layout = () => {
	return (
		<>
			<Header />

			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
