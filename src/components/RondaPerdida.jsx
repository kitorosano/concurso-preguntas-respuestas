import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function RondaPerdidas({ respuestaIncorrecta, setRespuestaIncorrecta, salirJuego }) {
	return (
		<Transition.Root show={respuestaIncorrecta} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				// onClose={setRespuestaIncorrecta}
				onClose={() => {}} //This is so the modal doesn't close when clicking outside of the dialog
			>
				<div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-out duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						{/* Background del menu de pausa */}
						<Dialog.Overlay className='fixed inset-0 bg-white bg-opacity-80 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						{/* Dialog */}
						<div className='inline-block align-middle p-6 my-8 w-auto max-w-3xl transform transition-all'>
							{/* TITULO */}
							<div className='pb-44 text-center my-5'>
								<Dialog.Title
									as='h3'
									className='text-9xl leading-6 font-semibold text-red-700 rotate-6'
								>
									Perdiste
								</Dialog.Title>
							</div>

							<div className='mt-28'>
								{/* ACUMULADO */}
								<div className='text-center'>
									<Dialog.Description
										as='h4'
										className='text-md leading-6 font-medium text-gray-500'
									>
										Esta vez no has ganado nada...
									</Dialog.Description>
								</div>

								{/* LEAVE BUTTON */}
								<div className='mt-3'>
									<button
										type='button'
										onClick={salirJuego}
										className='inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm'
									>
										Volver al Menu Principal
									</button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default RondaPerdidas;
