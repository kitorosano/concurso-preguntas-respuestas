import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const idFromAlias = async (searchAlias) => {
	// Asegura que no sea texto vacio
	if (searchAlias.trim().length === 0) return;

	// obtengo la coleccion de jugadores cuyos alias coincidan con el que necesito
	const jugadores = await getDocs(
		query(collection(db, 'jugadores'), where('Alias', '==', searchAlias))
	);

	// guardo el id del documento encontrado
	let aliasID;
	jugadores.forEach((doc) => (aliasID = doc.id));

	// Si encontre lo devuelvo,
	if (aliasID) {
		return aliasID;
	} else {
		//sino, creo un nuevo jugador con el alias y devuelvo el id del documento creado
		const nuevoJugador = await addDoc(collection(db, 'jugadores'), {
			Alias: searchAlias,
			Acumulado: 0,
		});
		return nuevoJugador.id;
	}
};
export default idFromAlias;
