import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Loading from './scenes/global/Loading';
import Dashboard from './scenes/dashboard';

function App() {
	const [theme, colorMode] = useMode();
	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Loading />
					<div className="app">
						<Sidebar />
						<main className='content'>
							<Topbar />
							<Routes>
								<Route path='/' element={<Dashboard/>} />
							</Routes>
						</main>
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	)
}

export default App
