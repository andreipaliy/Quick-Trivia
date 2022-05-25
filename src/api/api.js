import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'https://opentdb.com/api.php',
})

export const quizAPI = {
	getQuestions(category, difficulty, questions = 30) {
		debugger
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
				return response.data
			})
	},
}
export default quizAPI
