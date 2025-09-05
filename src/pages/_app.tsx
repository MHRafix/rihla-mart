import AppLayout from '@/components/AppLayout';
import HomeSkeleton from '@/components/common/GlobalSkeleton/HomeSkeleton';
import ScrollToTop from '@/utils/ScrollToTop';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	// This component shows while beforeLoad is running
	pendingComponent: () => <HomeSkeleton />,
	// This component shows after beforeLoad is done
	component: () => (
		<AppLayout>
			<ScrollToTop />
			<Outlet />
		</AppLayout>
	),
});
