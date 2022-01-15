import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';

import Game from './routes/game';
import Config from './routes/config';
import History from './routes/history.jsx';

ReactDOM.render(
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='game' element={<Game />} />
					<Route path='config' element={<Config />} />
					<Route path='history' element={<History />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>,
	document.getElementById('root')
);
