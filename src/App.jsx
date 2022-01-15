import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { rondaState } from './atoms/rondaAtom';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import idFromAlias from './utils/idFromAlias';

function App() {
	const aliasRef = useRef();
	const [rondaActual, setRondaActual] = useRecoilState(rondaState);
	const [puntajeActual, setPuntajeActual] = useState(0);
	const [alias, setAlias] = useState('');
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		// Comprobar que haya un alias como prueba de jugador para el almacenamiento de datos.
		const localAlias = localStorage.getItem('alias');
		if (localAlias) setAlias(localAlias);

		// Cargar acumulado total de la base de datos para mostrarlo en el menu
		(async () => {
			setCargando(true);
			const aliasID = await idFromAlias(alias);
			const jugador = await getDoc(doc(db, 'jugadores', aliasID));
			setPuntajeActual(jugador.data()?.Acumulado);
			setCargando(false);
		})();

    // Dejar pronta la ronda 1
		setRondaActual(1);
	}, [alias]);

  // Handler cuando se le da click al boton 'Entrar' luego de poner un Alias
	const entrar = () => {
		const newAlias = aliasRef.current.value.trim();
		// Si el alias es valido, guardarlo en el localstorage y en su state
		if (newAlias.length > 0) {
			localStorage.setItem('alias', newAlias);
			setAlias(aliasRef.current.value.trim());
		} else
			alert('Por favor, ingresa un alias para guardar tu progreso en el juego');
	};

	return (
		<> {/**SI NO HAY UN ALIAS, MOSTRAR LA PANTALLA PARA COLOCAR UNO */}
			{!alias.trim() ? (
				<div className='flex flex-col min-h-screen justify-center items-center text-3xl font-semibold'>
					<input
						ref={aliasRef}
						type='text'
						className='border-b-slate-700 border-2 focus:ring-transparent text-xl w-1/4 px-6 py-3 text-center bg-transparent'
						placeholder='INGRESE UN ALIAS (ej: ABC)'
						maxLength={3}
						autoFocus={true}
					/>
					<button className='menuItems mt-5' onClick={entrar}>
						Entrar
					</button>
				</div>
			) : (
        <div className='flex flex-col min-h-screen justify-center items-center text-3xl font-semibold space-y-10'>
          {/**SI HAY UN ALIAS, MOSTRAR EL MENU PRINCIPAL */}
					<div className='menuItems'>
						<Link to='/game'>Iniciar</Link>
					</div>
					<div className='menuItems'>
						<Link to='/config'>Configuración</Link>
					</div>
					<div className='menuItems'>
						<Link to='/history'>Historial</Link>
					</div>
          {/* AL MOMENTO DE CARGA, MOSTRAR UN SPINNER LOADING */}
					{cargando ? (
						<TailSpin arialLabel='loading-indicator' color='grey' />
					) : (
						<div className='flex space-x-10 text-yellow-600 font-bold text-4xl'>
							<p className='text-black'>[{alias}]</p>
							<div className='flex'>
								<CurrencyDollarIcon className='h-11 md:inline-flex mr-2' />
								<p className='cursor-default'>{puntajeActual}</p>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default App;
