import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]); // run whenever route changes

	return null;
}
