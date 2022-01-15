import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import idFromAlias from '../utils/idFromAlias';

function Config() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const preguntaRef = useRef(null);
	const respuestaCorrectaRef = useRef(null);
	const respuestaIncorrecta1Ref = useRef(null);
	const respuestaIncorrecta2Ref = useRef(null);
	const respuestaIncorrecta3Ref = useRef(null);
	const [categoria, setCategoria] = useState(1);

	const [alias, setAlias] = useState('');

	useEffect(() => {
		// Verificamos que tengamos un jugador para poder guardarle las preguntas posteriormente,
		const localAlias = localStorage.getItem('alias');
		if (localAlias) setAlias(localAlias);
		// de no haber un jugador nos volvemos al menu
		else navigate('/');
	}, [alias]);

	const seleccionarCategoria = (e) => {
		setCategoria(Number(e.target.value));
	};

	// Funcion para guardar en FIREBASE la pregunta
	const crearPregunta = async (e) => {
		e.preventDefault();
		if (loading) return; //prevenir spam de click
		setLoading(true);

		// Mejorando nombrado
		const preguntaValue = preguntaRef.current.value;
		const respuestaCValue = respuestaCorrectaRef.current.value;
		const respuestaI1Value = respuestaIncorrecta1Ref.current.value;
		const respuestaI2Value = respuestaIncorrecta2Ref.current.value;
		const respuestaI3Value = respuestaIncorrecta3Ref.current.value;

		// Corroborar formulario
		if (
			preguntaValue.trim().length < 1 ||
			respuestaCValue.trim().length < 1 ||
			respuestaI1Value.trim().length < 1 ||
			respuestaI2Value.trim().length < 1 ||
			respuestaI3Value.trim().length < 1
		)
			return alert(
				'Por favor, asegurate de llenar todos los campos antes de enviar!'
			);

		// Crear pregunta y agregarla a la firestore bajo la coleccion de categoria correspondiente
		try {
			const aliasID = await idFromAlias(alias);
			const docRef = await addDoc(
				collection(db, 'jugadores', aliasID, 'preguntas'),
				{
					p: preguntaValue,
					resC: respuestaCValue,
					resI1: respuestaI1Value,
					resI2: respuestaI2Value,
					resI3: respuestaI3Value,
					cat: categoria,
				}
			);
			alert('Se ha agregado la pregunta correctamente!');
		} catch (err) {
			console.log(err);
		}

		// Limpiar campos del from
		preguntaRef.current.value = '';
		respuestaCorrectaRef.current.value = '';
		respuestaIncorrecta1Ref.current.value = '';
		respuestaIncorrecta2Ref.current.value = '';
		respuestaIncorrecta3Ref.current.value = '';
		setCategoria(1);

		setLoading(false);
	};

	return (
		<>
			<form onSubmit={(e) => crearPregunta(e)}>
				<div className='flex flex-col justify-center items-center'>
					{/* INGRRESAR PREGUNTA */}
					<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
						<div className='mt-3 text-center sm:mt-5'>
							<div className='mt-2'>
								<input
									ref={preguntaRef}
									type='text'
									className='border-none focus:ring-0 w-full text-center'
									placeholder='Ingresa una pregunta...'
								/>
							</div>
						</div>
					</div>

					{/* INGRESAR RESPUESTAS */}
					<div className='inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'>
						<div className='pb-3 text-center sm:mt-5 border-b'>
							<div className='mt-2'>
								<input
									ref={respuestaCorrectaRef}
									type='text'
									className='border-none focus:ring-0 w-full text-center'
									placeholder='Ingresa la respuesta correcta...'
								/>
							</div>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<div className='mt-2'>
								<input
									ref={respuestaIncorrecta1Ref}
									type='text'
									className='border-none focus:ring-0 w-full text-center'
									placeholder='Ingresa una respuesta incorrecta...'
								/>
							</div>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<div className='mt-2'>
								<input
									ref={respuestaIncorrecta2Ref}
									type='text'
									className='border-none focus:ring-0 w-full text-center'
									placeholder='Ingresa una respuesta incorrecta...'
								/>
							</div>
						</div>
						<div className='mt-3 text-center sm:mt-5'>
							<div className='mt-2'>
								<input
									ref={respuestaIncorrecta3Ref}
									type='text'
									className='border-none focus:ring-0 w-full text-center'
									placeholder='Ingresa una respuesta incorrecta...'
								/>
							</div>
						</div>
					</div>

					{/* CATEGORIA */}
					<div className='flex flex-row'>
						<label
							htmlFor='facil'
							className={`${
								categoria === 1 ? 'bg-red-300' : 'bg-white hover:bg-red-100'
							} text-xl w-full flex items-center content-center justify-center rounded-lg shadow-xl p-5 text-center m-2 cursor-pointer  `}
						>
							Facil
							<input
								id='facil'
								name='categoria'
								type='radio'
								className='hidden'
								value='1'
								checked={categoria === 1}
								onChange={(e) => seleccionarCategoria(e)}
							/>
						</label>

						<label
							htmlFor='normal'
							className={`${
								categoria === 2 ? 'bg-red-300' : 'bg-white hover:bg-red-100'
							} text-xl w-full flex items-center content-center justify-center rounded-lg shadow-xl p-5 text-center m-2 cursor-pointer hover:bg-red-100`}
						>
							Normal
							<input
								id='normal'
								name='categoria'
								type='radio'
								className='hidden'
								value='2'
								checked={categoria === 2}
								onChange={(e) => seleccionarCategoria(e)}
							/>
						</label>
						<label
							htmlFor='dificil'
							className={`${
								categoria === 3 ? 'bg-red-300' : 'bg-white hover:bg-red-100'
							} text-xl w-full flex items-center content-center justify-center rounded-lg shadow-xl p-5 text-center m-2 cursor-pointer hover:bg-red-100`}
						>
							Dificil
							<input
								id='dificil'
								name='categoria'
								type='radio'
								className='hidden'
								value='3'
								checked={categoria === 3}
								onChange={(e) => seleccionarCategoria(e)}
							/>
						</label>
						<label
							htmlFor='avanzado'
							className={`${
								categoria === 4 ? 'bg-red-300' : 'bg-white hover:bg-red-100'
							} text-xl w-full flex items-center content-center justify-center rounded-lg shadow-xl p-5 text-center m-2 cursor-pointer hover:bg-red-100`}
						>
							Avanzado
							<input
								id='avanzado'
								name='categoria'
								type='radio'
								className='hidden'
								value='4'
								checked={categoria === 4}
								onChange={(e) => seleccionarCategoria(e)}
							/>
						</label>
						<label
							htmlFor='extremo'
							className={`${
								categoria === 5 ? 'bg-red-300' : 'bg-white hover:bg-red-100'
							} text-xl w-full flex items-center content-center justify-center rounded-lg shadow-xl p-5 text-center m-2 cursor-pointer hover:bg-red-100`}
						>
							Extremo
							<input
								id='extremo'
								name='categoria'
								type='radio'
								className='hidden'
								value='5'
								checked={categoria === 5}
								onChange={(e) => seleccionarCategoria(e)}
							/>
						</label>
					</div>

					{/* Boton Submit */}
					<div className='mt-5 sm:mt-6'>
						<button type='submit' className='menuItems answerBtn'>
							Crear Pregunta
						</button>
					</div>
				</div>
			</form>

			<div className='flex justify-start mx-10'>
				<button onClick={() => navigate('/')} className='menuItems text-xl font-semibold'>
					Volver
				</button>
			</div>
		</>
	);
}

export default Config;
