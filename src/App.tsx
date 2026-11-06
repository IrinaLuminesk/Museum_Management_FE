import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { NotificationProvider } from './scenes/global/Snackbar';
import router from './routes';
import './App.css'

// import Topbar from './scenes/global/Topbar';
// import Sidebar from './scenes/global/Sidebar';
import Loading from './scenes/global/Loading';

function App() {
	const [theme, colorMode] = useMode();
	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<NotificationProvider>
						<Loading />
						<RouterProvider router={router} />
					</NotificationProvider>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
