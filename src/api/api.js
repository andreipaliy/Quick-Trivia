import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'https://opentdb.com/api.php',
})

export const quizAPI = {
	getQuestions(questions = 50) {
		return instance
			.get(`?amount=10&category=9&difficulty=easy&type=boolean`)
			.then(response => {
				return response.data
			})
	},
}
export default quizAPI
