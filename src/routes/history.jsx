import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
	const [alias, setAlias] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		// verificar alias en el localstorage
		const localAlias = localStorage.getItem('alias');
		if (localAlias) setAlias(localAlias);
		else {
			return navigate('/');
		}
	}, [alias]);

	return (
		<div className='flex h-screen justify-center items-center text-3xl'>
			<button
				onClick={() => navigate('/')}
				className='menuItems text-3xl font-semibold'
			>
				Proximamente...
			</button>
		</div>
	);
}

export default History;
