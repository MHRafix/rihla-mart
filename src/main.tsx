import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalLoadingScreen from './components/GlobalLoadingScreen';
import AppGlobalProvider from './components/providers/AppGlobalProvider';
import { ThemeProvider } from './components/providers/ThemeProvider';
import './index.css';
import { routeTree } from './pagesTree.gen';
import { jotaiStore } from './store';

// Create a new router instance
const router = createRouter({
	defaultPendingComponent: GlobalLoadingScreen,
	routeTree,
	context: { auth: undefined! },
	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider defaultTheme='light'>
			<JotaiProvider store={jotaiStore}>
				<AppGlobalProvider>
					<RouterProvider router={router} />{' '}
				</AppGlobalProvider>
			</JotaiProvider>
		</ThemeProvider>
	</StrictMode>
);
