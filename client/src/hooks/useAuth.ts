import {useCallback, useEffect, useState} from "react";

export const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [loginName, setLoginName] = useState('');

	const login = useCallback((jwtToken, id, loginName) => {
		setToken(jwtToken);
		setUserId(id);

		localStorage.setItem(storageName, JSON.stringify({
			userId: id, token: jwtToken, loginName: loginName,
		}))
	}, []);

	const logout = useCallback(() => {
		setToken('');
		setUserId('');
		setLoginName('');
		localStorage.removeItem(storageName);
	}, []);

	return { login, logout, token, userId, loginName }
}