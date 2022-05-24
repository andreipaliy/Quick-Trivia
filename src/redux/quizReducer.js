import quizAPI from '../api/api'
import { decode } from 'he'
import { shuffleArr } from '../utils/shuffleArray'

const SET_QUESTIONS = 'quizReducer/SET_QUESTIONS'
const SET_CURRENT_Q = 'SET_CURRENT_Q'
const CHECK_ANSWER = 'quizReducer/CHECK_ANSWER'
const MODIFY_PASSED_Q = 'quizReducer/MODIFY_PASSED_Q'
const SET_SPEED = 'quizReducer/SET_SPEED'

let initialState = {
	questions: [],
	currentQ: null,
	passedQ: [],
	failedQ: [],
	continue: null,
	speed: 30000,
}

const quizReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_QUESTIONS:
			return {
				...state,
				questions: action.questions,
				passedQ: [],
			}
		case SET_CURRENT_Q:
			const newQuestions = state.questions.pop()
			debugger
			return {
				...state,
				continue: true,
				currentQ: {
					...newQuestions,
					question: decode(newQuestions.question),
					correct_answer: decode(newQuestions.correct_answer),
					answers: shuffleArr([
						...newQuestions.incorrect_answers
							.map(i => decode(i))
							.concat(decode(newQuestions.correct_answer)),
					]),
				},
			}
		case CHECK_ANSWER:
			debugger

			return {
				...state,
				continue: action.answer === state.currentQ.correct_answer,
			}
		case MODIFY_PASSED_Q:
			return state.continue
				? {
						...state,
						passedQ: [...state.passedQ.concat(state.currentQ)],
				  }
				: {
						...state,
						failedQ: [...state.failedQ.concat(state.currentQ)],
				  }
		case SET_SPEED:
			debugger
			return {
				...state,
				speed: parseInt(action.speed) * 1000,
			}
		default:
			return state
	}
}
const modifyPassedQCreator = () => ({
	type: MODIFY_PASSED_Q,
})
const checkResponseCreator = answer => ({
	type: CHECK_ANSWER,
	answer,
})
export const checkResponse = answer => dispatch => {
	dispatch(checkResponseCreator(answer))
	dispatch(modifyPassedQCreator())
}

const getQuestionsCreator = questions => ({
	type: SET_QUESTIONS,
	questions,
})
const setCurrentQCreator = () => ({
	type: SET_CURRENT_Q,
})
export const changeCurrentQ = () => dispatch => {
	dispatch(setCurrentQCreator())
}

export const getQuestions = () => async dispatch => {
	let response = await quizAPI.getQuestions()
	debugger
	if (response.response_code === 0) {
		dispatch(getQuestionsCreator(response.results))
		dispatch(setCurrentQCreator())
	}
}
const setSpeedCreator = speed => ({
	type: SET_SPEED,
	speed,
})
export const setSpeed = speed => dispatch => {
	dispatch(setSpeedCreator(speed))
}
export default quizReducer
