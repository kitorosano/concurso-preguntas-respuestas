import Ronda from '../components/Ronda';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { rondaState } from '../atoms/rondaAtom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
	collection,
	collectionGroup,
	doc,
	getDoc,
	getDocs,
	query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import RondaGanada from '../components/RondaGanada';
import RondaPerdida from '../components/RondaPerdida';
import Footer from '../components/Footer';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import idFromAlias from '../utils/idFromAlias';

function Game() {
	const navigate = useNavigate();
	const [rondaActual, setRondaActual] = useRecoilState(rondaState);
	const [resetTimer, setResetTimer] = useState(0);
	const [puntajeJuego, setPuntajeJuego] = useState(0);
	const [rondas, setRondas] = useState([]);
	const [cargandoRonda, setCargandoRonda] = useState(true);
	const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
	const [respuestaIncorrecta, setRespuestaIncorrecta] = useState(false);
	const [alias, setAlias] = useState('');

	useEffect(() => {
		setCargandoRonda(true); //detiene el temporizador hasta que cargen las preguntas

		// Verificamos que tengamos un jugador para poder guardarle las preguntas posteriormente,
		const localAlias = localStorage.getItem('alias');
		if (localAlias) setAlias(localAlias);
		// de no haber un jugador nos volvemos al menu
		else salirJuego();

		(async () => {
			const aliasID = await idFromAlias(alias);
			const preguntas = await getDocs(
				collection(db, 'jugadores', aliasID, 'preguntas')
			);

			let categorias = [[], [], [], [], []];
			preguntas.docs.map((doc) => {
				categorias[doc.data().cat - 1]?.push(doc.data());
			});

			const preguntasRandom = categorias.map(
				(cat, i) => cat[Math.floor(Math.random() * cat.length)]
			);
			setRondas(preguntasRandom); //guarda las preguntas a utilizar en el juego
			setCargandoRonda(false); //arranca el temporizador
		})();
	}, [alias]);

	// RESETEAR TIMER CUANDO SE CAMBIA DE RONDA
	useEffect(() => {
		setResetTimer((prevKey) => prevKey + 1);
	}, [rondaActual]);

	// MANEJADOR DE RESPUESTA CORRECTAS E INCORRECTAS
	useEffect(() => {
		if (respuestaCorrecta) {
			// ACTUALIZAR PUNTAJE LUEGO DE CONTESTAR CORRECTAMENTE
			setPuntajeJuego((previo) => (previo + 10) * rondaActual);
		} else if (respuestaIncorrecta)
			// RESETAR PUNTAJE SI PERDIO
			setPuntajeJuego(0);
	}, [respuestaCorrecta, respuestaIncorrecta]);

	const avanzarRonda = () => {
		// Cambiar a la siguiente ronda
		setRondaActual((previo) => previo + 1);
		setRespuestaCorrecta(false);
	};

	const salirJuego = async () => {
    setCargandoRonda(true)

    // guardar acumulado
    const aliasID = await idFromAlias(alias);
    const jugador = await getDoc(doc(db, 'jugadores', aliasID));
    const puntajeTotal = jugador.data()?.Acumulado;

    await updateDoc(doc(db, 'jugadores', aliasID),{
      Acumulado: puntajeTotal + puntajeJuego
    })

		// guardar historial
    

		// cerrar modales
		setRespuestaCorrecta(false);
    
    setCargandoRonda(false)
		// navigate
		return navigate('/');
	};

	return (
		<div>
			{cargandoRonda ? (
				<div className='flex h-screen flex-1 justify-center items-center text-center'>
					<TailSpin arialLabel='loading-indicator' color='grey' />
				</div>
			) : (
				<>
					<Header
						cargandoRonda={cargandoRonda}
						setRespuestaIncorrecta={setRespuestaIncorrecta}
						resetTimer={resetTimer}
					/>
					{!cargandoRonda && rondas.length > 0 && rondaActual <= 5 && (
						<Ronda
							preguntaRonda={rondas[rondaActual - 1]}
							setRespuestaCorrecta={setRespuestaCorrecta}
							setRespuestaIncorrecta={setRespuestaIncorrecta}
						/>
					)}
					<Footer rondaActual={rondaActual} puntajeJuego={puntajeJuego} />
				</>
			)}
			{respuestaCorrecta && (
				<RondaGanada
					respuestaCorrecta={respuestaCorrecta}
					rondaActual={rondaActual}
					avanzarRonda={avanzarRonda}
					salirJuego={salirJuego}
				/>
			)}
			{respuestaIncorrecta && (
				<RondaPerdida
					respuestaIncorrecta={respuestaIncorrecta}
					setRespuestaIncorrecta={setRespuestaIncorrecta}
					salirJuego={salirJuego}
				/>
			)}
		</div>
	);
}

export default Game;

/**
 * CREAR COMPONENTE RONDA?
 * PASARLE LA RONDA AL Q&A PARA QUE ESTE ACTUALICE LA PREGUNTA, LAS RESPUESTAS Y EL TIMER
 * SI LE ERRA A LA RESPUESTA PANTALLA DE PERDIDA(COMPONENTE COMO PAUSEMENU)
 * EL COMPONENTE Q&A DEBERA DE CREAR EL LAYOUT COMPLETO DE LA PREGUNTA CON LAS 4 RESPUESTAS, SOLO SERA PASARLE LA RONDA ACTUAL, PARA QUE ESTE ACTUALICE
 */
