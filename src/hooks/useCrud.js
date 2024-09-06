import axios from 'axios';
import { useState } from 'react';
import getConfigToken from '../services/getConfigToken';

const useCrud = () => {
	const [response, setResponse] = useState();

	//read
	const getData = (url, withToken) => {
		axios
			.get(url, withToken ? getConfigToken() : {})
			.then((res) => setResponse(res.data))
			.catch((err) => {
				console.error(err);
				//401 no autorizado o 403 el token expiro
				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};
	//create
	const postData = (url, data, withToken) => {
		axios
			.post(url, data, withToken ? getConfigToken() : {})
			.then((res) => {
				setResponse(response ? [...response, res.data] : [res.data]);
			})
			.catch((err) => {
				console.error(err);
				//401 no autorizado o 403 el token expiro
				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};

	//delete
	const deleteData = (url, id, withToken) => {
		axios
			.delete(url, withToken ? getConfigToken() : {})
			.then((res) => {
				setResponse(response.filter((item) => item.id !== id));
			})
			.catch((err) => {
				console.error(err);
				//401 no autorizado o 403 el token expiro
				if (err?.response.status === 401 || err?.response.status === 403) {
					localStorage.removeItem('token');
					localStorage.removeItem('userLogged');
				}
			});
	};

	//update
	const updateData = () => {};

	return [response, getData, postData, deleteData, updateData];
};

export default useCrud;
