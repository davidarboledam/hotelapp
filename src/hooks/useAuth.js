import axios from 'axios';
import { useState } from 'react';

const useAuth = () => {
	const [isLoading, setIsLoading] = useState(true);
	//Register
	const createUser = (data) => {
		const url = 'https://hotels-api.academlo.tech/users';
		axios
			.post(url, data)
			.then((res) => res.data)
			.catch((err) => console.error(err))
			.finally(() => {
				setIsLoading(false);
			});
	};

	//Login
	const loginUser = (data) => {
		const url = 'https://hotels-api.academlo.tech/users/login';
		axios
			.post(url, data)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('userLogged', JSON.stringify(res.data.user));
			})
			.catch((err) => console.error(err))
			.finally(() => {
				setIsLoading(false);
			});
	};
	return { createUser, loginUser, isLoading };
};

export default useAuth;
