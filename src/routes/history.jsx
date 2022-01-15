import { addDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { db } from '../firebase';
import idFromAlias from '../utils/idFromAlias';

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

		(async () => {
			const aliasID = await idFromAlias(alias);
			// for (let i = 1; i <= 5; i++) {
			// 	const categorias = await getDocs(
			// 		collection(db, 'jugadores', aliasID, 'preguntas')
			// 	);

			// 	const preguntas = categorias.docs.map((doc) => doc.data());

			// 	const preguntasConCategoria = preguntas.map((obj) => ({
			// 		...obj,
			// 		cat: i,
			// 	}));

			// 	for (let i = 0; i < preguntasConCategoria.length; i++) {
			// 		await addDoc(
			// 			collection(db, 'preguntas'),
			// 			preguntasConCategoria[i]
			// 		);
			// 	}
			// }
		})();
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
