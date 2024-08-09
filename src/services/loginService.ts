import axios from 'axios'

export const loginUser = async (username: string, password: string) => {
	try {
		const response = await axios.post('/api/login', { username, password })
		return response.data
	} catch (error) {
		throw error
	}
}
