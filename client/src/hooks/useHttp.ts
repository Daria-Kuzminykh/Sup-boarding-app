import {useCallback, useState} from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setLoading(true);
		try {
			if (body) {
				body = JSON.stringify(body);
				headers['Content-Type'] = 'application/json';
			}

			//for development
			const response = await fetch(`http://localhost:5000${url}`, { method, body, headers });

			//for production
			// const response = await fetch(url, { method, body, headers });

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так...');
			}

			setLoading(false);

			return data;
		} catch (e) {
			setLoading(false);
			setError(e.message);
			throw e;
		}
	}, []);

	const clearError = useCallback(() => setError(''), []);

	return { loading, error, request, clearError }
}