import { CurrencyDollarIcon } from "@heroicons/react/outline";

function Footer({ rondaActual, puntajeJuego }) {
	return (
		<div className='flex justify-between items-center max-w-6xl p-5 px-40 mt-5 mx-auto '>
			{/* Left - Logo Images*/}
			<div className='flex font-bold text-4xl text-yellow-600 z-20'>
				<CurrencyDollarIcon className='h-11 md:inline-flex mr-2' />
				<p className='mt-[1px] cursor-default'>{puntajeJuego}</p>
			</div>

			{/* Right - Rondas */}
			<div className='flex font-bold text-4xl'>
				<h1 className='cursor-default'>{rondaActual} / 5</h1>
			</div>
		</div>
	);
}

export default Footer;
