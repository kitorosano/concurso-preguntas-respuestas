import { CurrencyDollarIcon, PauseIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { temporizadorState } from '../atoms/temporizadorAtom';

function Header({ setRespuestaIncorrecta, resetTimer }) {
	const [playing, setPlaying] = useRecoilState(temporizadorState);
	const TIEMPO_PARA_RESPONDER_PREGUNTAS = 30;

	return (
		<div className='flex justify-center items-center pt-5 text-center'>
			{/* Middle - TIMER*/}
			<CountdownCircleTimer
				key={resetTimer}
				isPlaying={playing}
				strokeWidth={7}
				size={100}
				colors={['#139d35', '#F7B801', '#A30000']}
				colorsTime={[
					TIEMPO_PARA_RESPONDER_PREGUNTAS,
					TIEMPO_PARA_RESPONDER_PREGUNTAS / 2,
					0,
				]}
				duration={TIEMPO_PARA_RESPONDER_PREGUNTAS}
				onComplete={() => setRespuestaIncorrecta(true)}
			>
				{({ elapsedTime, color }) => (
					<span style={{ color }}>
						<div className='time-wrapper'>
							<div className='text-4xl font-semibold cursor-default'>
								{(TIEMPO_PARA_RESPONDER_PREGUNTAS - elapsedTime) | 0}
							</div>
						</div>
					</span>
				)}
			</CountdownCircleTimer>
		</div>
	);
}

export default Header;
