import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
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
					<Loading />
					{/* <div className="app">
						<Sidebar />
						<main className='content'>
							<Topbar />
							<RouterProvider router={router} />
						</main>
					</div> */}
					<RouterProvider router={router} />
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
