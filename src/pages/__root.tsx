import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRouteWithContext()({
	// beforeLoad: async () => {
	// 	await fetchME();
	// 	return { auth: jotaiStore.get(userAtom) };
	// },
	component: () => (
		<>
			<Outlet />
			{!import.meta.env.PROD && <TanStackRouterDevtools />}
		</>
	),
	notFoundComponent: () => <div>404</div>,
});
