import * as axios from 'axios'

const instance = axios.create({
	// creating an instance for ease of reuse of *basic part of URL*
	baseURL: 'https://opentdb.com/api.php',
})

export const quizAPI = {
	// object represents DAL (Data Acces Layer), and incapsulate request to the server
	getQuestions(category, difficulty, questions = 30) {
		return instance
			.get(
				`?amount=${questions}${
					category === 'any' ? '' : '&category=' + category
				}${
					difficulty === 'any' || difficulty === null
						? ''
						: '&difficulty=' + difficulty
				}`
			)
			.then(response => {
				// .then returns only date from server request
				return response.data
			})
	},
}
export default quizAPI
