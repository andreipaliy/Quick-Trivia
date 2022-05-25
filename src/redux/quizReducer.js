import quizAPI from '../api/api'
import { decode } from 'he'
import { shuffleArr } from '../utils/shuffleArray'

const SET_QUESTIONS = 'quizReducer/SET_QUESTIONS'
const UPLOAD_NEW_QUESTIONS = 'quizReducer/UPLOAD_NEW_QUESTIONS'
const SET_CURRENT_Q = 'quizReducer/SET_CURRENT_Q'
const CHECK_ANSWER = 'quizReducer/CHECK_ANSWER'
const MODIFY_PASSED_Q = 'quizReducer/MODIFY_PASSED_Q'
const SET_SPEED = 'quizReducer/SET_SPEED'
const RESET_STATE = 'quizReducer/RESET_STATE'
const SKIP_QUESTION = 'quizReducer/SKIP_QUESTION'
const SET_CATEGORY = 'quizReducer/SET_CATEGORY'
const SET_DIFFICULTY = 'quizReducer/SET_DIFFICULTY'
const SET_ERROR = 'quizReducer/SET_ERROR'

let initialState = {
	questions: [],
	currentQ: null,
	passedQ: [],
	failedQ: [],
	isCorrectCurrentResponse: null,
	speed: 30000,
	diamondPoints: null,
	dummyPoints: null,
	category: 'any',
	difficulty: null,
	skippedQcounter: null,
	error: false,
}

const quizReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_QUESTIONS:
			return {
				...state,
				questions: shuffleArr(action.questions),
				passedQ: [],
				failedQ: [],
				diamondPoints: 1,
				dummyPoints: 0,
				currentQ: null,
				skippedQcounter: 0,
				error: false,
			}
		case UPLOAD_NEW_QUESTIONS:
			return {
				...state,
				questions: shuffleArr(action.questions),
			}
		case SET_CURRENT_Q:
			const newQuestions = state.questions.pop()
			debugger
			return {
				...state,
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
			const isCorrect = action.answer === state.currentQ.correct_answer
			return {
				...state,
				isCorrectCurrentResponse: isCorrect,
				diamondPoints: isCorrect
					? ++state.diamondPoints
					: state.diamondPoints,
				dummyPoints: isCorrect
					? state.dummyPoints
					: ++state.dummyPoints,
			}
		case MODIFY_PASSED_Q:
			return state.isCorrectCurrentResponse
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
		case SET_CATEGORY:
			debugger
			return {
				...state,
				category: action.categoryNumber,
			}
		case SET_DIFFICULTY:
			debugger
			return {
				...state,
				difficulty: action.difficulty,
			}
		case RESET_STATE:
			return {
				...state,
				error: false,
				currentQ: null,
			}
		case SKIP_QUESTION:
			debugger
			return {
				...state,
				dummyPoints: state.dummyPoints + 0.5,
				skippedQcounter: ++state.skippedQcounter,
			}
		case SET_ERROR:
			debugger
			return {
				...state,
				error: true,
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
	debugger
	dispatch(checkResponseCreator(answer))
	debugger
	dispatch(modifyPassedQCreator())
}

const getQuestionsCreator = questions => ({
	type: SET_QUESTIONS,
	questions,
})
const setCurrentQCreator = () => ({
	type: SET_CURRENT_Q,
})
const errorCreator = () => ({
	type: SET_ERROR,
})
export const changeCurrentQ = () => dispatch => {
	dispatch(setCurrentQCreator())
}

export const getQuestions = (category, difficulty) => async dispatch => {
	let response = await quizAPI.getQuestions(category, difficulty)
	debugger
	if (response.response_code === 0) {
		dispatch(getQuestionsCreator(response.results))
		dispatch(setCurrentQCreator())
	} else dispatch(errorCreator())
}
const setSpeedCreator = speed => ({
	type: SET_SPEED,
	speed,
})
export const setSpeed = speed => dispatch => {
	dispatch(setSpeedCreator(speed))
}
const setCategoryCreator = categoryNumber => ({
	type: SET_CATEGORY,
	categoryNumber,
})
export const setCategory = categoryNumber => dispatch => {
	dispatch(setCategoryCreator(categoryNumber))
}
const setDifficultyCreator = difficulty => ({
	type: SET_DIFFICULTY,
	difficulty,
})
export const setDifficulty = difficulty => dispatch => {
	dispatch(setDifficultyCreator(difficulty))
}

const uploadQuestionsCreator = questions => ({
	type: UPLOAD_NEW_QUESTIONS,
	questions,
})

export const uploadNewQ = (category, difficulty) => async dispatch => {
	let response = await quizAPI.getQuestions(category, difficulty)
	debugger
	if (response.response_code === 0) {
		dispatch(uploadQuestionsCreator(response.results))
		dispatch(setCurrentQCreator())
	} else dispatch(errorCreator())
}
const resetStateCreator = () => ({
	type: RESET_STATE,
})
export const resetState = () => dispatch => {
	debugger
	dispatch(resetStateCreator())
}
const skipCurrentQuestionCreator = () => ({
	type: SKIP_QUESTION,
})
export const skipCurrentQuestion = () => dispatch => {
	dispatch(skipCurrentQuestionCreator())
	// dispatch(setCurrentQCreator())
}
export default quizReducer
