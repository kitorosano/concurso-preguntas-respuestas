import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { temporizadorState } from '../atoms/temporizadorAtom';

function Ronda({
	preguntaRonda,
	setRespuestaCorrecta,
	setRespuestaIncorrecta,
}) {
	const {
		p: pregunta,
		resC,
		resI1,
		resI2,
		resI3,
	} = preguntaRonda;
	const [playing, setPlaying] = useRecoilState(temporizadorState);
  let respuestas = [resC, resI1, resI2, resI3];
  
  let respuestasRandom = []
  // Hacemos que el orden de aparicion de las respuesta sea aleatorio
  for(let i = respuestas.length-1 ;i >= 0; i--){
    respuestasRandom.push(respuestas.splice(Math.floor(Math.random()*respuestas.length), 1))
  }

	const verificarRespuesta = (e) => {
		const respuesta = e.target.value;

		respuesta === preguntaRonda.resC // si es la respuesta correcta
			? setRespuestaCorrecta(true)
			: setRespuestaIncorrecta(true);

		setPlaying(false);
	};

	useEffect(() => {
		setPlaying(true);
	}, [preguntaRonda]);

	return (
		<div className='flex justify-center items-center max-w-6xl p-5 px-40 mx-auto '>
			<div>
				<h1 className='font-bold text-2xl text-center shadow-sm shadow-black bg-slate-700 bg-opacity-10 border-b border-black p-5 mb-2 '>
					{pregunta}
				</h1>

				<form>
					<div className='flex p-6 shadow-lg border rounded-sm'>
						<div className='grid grid-cols-1 xl:grid-cols-2 xl:max-w-3xl mx-auto'>
							<div className='m-5'>
								<input
									onClick={verificarRespuesta}
									type='button'
									className='menuItems answerBtn '
									value={respuestasRandom[0]}
								/>
							</div>
							<div className='m-5'>
								<input
									onClick={verificarRespuesta}
									type='button'
									className='menuItems answerBtn '
									value={respuestasRandom[1]}
								/>
							</div>
							<div className='m-5'>
								<input
									onClick={verificarRespuesta}
									type='button'
									className='menuItems answerBtn '
									value={respuestasRandom[2]}
								/>
							</div>
							<div className='m-5'>
								<input
									onClick={verificarRespuesta}
									type='button'
									className='menuItems answerBtn '
									value={respuestasRandom[3]}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Ronda;
