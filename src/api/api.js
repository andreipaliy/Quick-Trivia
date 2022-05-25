import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'https://opentdb.com/api.php',
})

export const quizAPI = {
	getQuestions(category, questions = 50) {
		debugger
		return instance
			.get(
				`?amount=50${category === 'any' ? '' : '&category=' + category}`
			)
			.then(response => {
				return response.data
			})
	},
}
export default quizAPI
