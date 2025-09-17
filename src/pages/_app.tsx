import AppLayout from '@/components/AppLayout';
import HomeSkeleton from '@/components/common/GlobalSkeleton/HomeSkeleton';
import { initFacebookPixel, trackPageView } from '@/lib/fbPixel';
import ScrollToTop from '@/utils/ScrollToTop';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_app')({
	// This component shows while beforeLoad is running
	pendingComponent: () => <HomeSkeleton />,
	// This component shows after beforeLoad is done
	component: () => {
		useEffect(() => {
			initFacebookPixel('25103151619292816'); // Replace with your actual ID
			trackPageView(); // Track first page load
		}, []);

		return (
			<AppLayout>
				<ScrollToTop />
				<Outlet />
			</AppLayout>
		);
	},
});
