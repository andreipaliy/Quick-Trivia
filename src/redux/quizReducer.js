import quizAPI from '../api/api'
import { decode } from 'he' // importing a function of deconding data that comes from server
import { shuffleArr } from '../utils/shuffleArray' // importing Fisher-Yates algorith of shuffling arrays

// =============HARDCODED NAMES OF ACTION TYLES====================
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
// =================================================================

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
	switch (
		action.type // executing switch-cases by value of action.type
	) {
		//===========SETTING QUESTIONS AFTER RECEIVING FROM SERVER=================
		case SET_QUESTIONS: // it's dispatched every time when user starts a new game
			return {
				...state,
				questions: shuffleArr(action.questions), // suffling received question
				passedQ: [],
				failedQ: [],
				diamondPoints: 1,
				dummyPoints: 0,
				currentQ: null, // will be setted later by another dispatch
				skippedQcounter: 0,
				error: false, // removing error when game starts
			}

		//===UPLOADING NEW QUESTIONS IF USER SEES ALL THE QUESTIONS RECEIVED BEFORE===
		case UPLOAD_NEW_QUESTIONS:
			return {
				...state,
				questions: shuffleArr(action.questions), // shuffle also the suplimentar recieved questions
			}

		//=======SETTING CURRENT QUESTION AFTER SETTING ALL THE QUESTION RECIEVED=====
		case SET_CURRENT_Q:
			const newQuestions = state.questions.pop()

			return {
				...state,
				currentQ: {
					...newQuestions,
					question: decode(newQuestions.question), // decode question string before sending it to UI layer
					correct_answer: decode(newQuestions.correct_answer), // also decode
					answers: shuffleArr([
						// includes all answers (correct + incorrect) + decode it
						...newQuestions.incorrect_answers
							.map(i => decode(i))
							.concat(decode(newQuestions.correct_answer)),
					]),
				},
			}

		//=======SETTING CURRENT QUESTION AFTER SETTING ALL THE QUESTION RECIEVED=====
		case CHECK_ANSWER:
			const isCorrect = action.answer === state.currentQ.correct_answer // verify if comed answer is correct
			return {
				...state,
				isCorrectCurrentResponse: isCorrect, // set the above result of comparison
				diamondPoints: isCorrect
					? ++state.diamondPoints // increment *good points* if answer is matching
					: state.diamondPoints,
				dummyPoints: isCorrect
					? state.dummyPoints
					: ++state.dummyPoints, // increment *bad points* if answer is't matching
			}

		//=======ADDING QUESTIONS + RESPONSE OF CORRECT OF INCORRECT COLLECTION=====
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

		//=======================SETS THE TIME/SPEED FOR ANSWERING===================
		case SET_SPEED:
			return {
				...state,
				speed: parseInt(action.speed) * 1000,
			}

		//===============SETS CATEGORY OF QUESTIONS TO GET FROM SERVER===============
		case SET_CATEGORY:
			return {
				...state,
				category: action.categoryNumber, // category is stored as number, because server api expets it
			}

		//===============SETS DIFFICULTY OF QUESTIONS TO GET FROM SERVER===============
		case SET_DIFFICULTY:
			return {
				...state,
				difficulty: action.difficulty,
			}

		//===============RESETS NEEDED PARTS OF STATE===============
		// is triggered from *error 404* and *game over* pages
		case RESET_STATE:
			return {
				...state,
				error: false,
				currentQ: null,
			}

		//=========PROCCESSING SKIPPING THE QUESTION===============
		case SKIP_QUESTION:
			return {
				...state,
				dummyPoints: state.dummyPoints + 0.5,
				skippedQcounter: ++state.skippedQcounter,
			}

		//=========SETTING ERROR WHEN SOMETHING GETS WRONG===============
		// for example when server doesn't have enough questions of needed type
		// you can test it my starting game with category: "Entertaiments: Music and Theatre" + "Hard" level!
		// server have only few questions with this configuration
		case SET_ERROR:
			return {
				...state,
				error: true,
			}
		default:
			return state
	}
}
//=================PROCESSING USER'S SUBMIT OF QUESTIONS==================
const modifyPassedQCreator = () => ({
	type: MODIFY_PASSED_Q,
})
const checkResponseCreator = answer => ({
	type: CHECK_ANSWER,
	answer,
})
export const checkResponse = answer => dispatch => {
	// use closure for remembering answer
	dispatch(checkResponseCreator(answer))
	dispatch(modifyPassedQCreator())
}
//========================================================================

//=============GETTING QUESTIONS FROM SERVER + DISPATCH NEEDED ACTIONS==============
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
	let response = await quizAPI.getQuestions(category, difficulty) // using await for waiting server's answer

	if (response.response_code === 0) {
		dispatch(getQuestionsCreator(response.results)) // starting setting questions in state
		dispatch(setCurrentQCreator()) // and set current question
	} else dispatch(errorCreator()) // processing error from server
}
//====================================================================================

//====================SETTING REPONSE-TIME PER QUESTION / SPEED=======================
const setSpeedCreator = speed => ({
	type: SET_SPEED,
	speed,
})
export const setSpeed = speed => dispatch => {
	dispatch(setSpeedCreator(speed))
}
//====================================================================================

//======================SETTING CATEGORY OF QUESTIONS=================================
// it's called when user selects it in starting menu the category of Q

const setCategoryCreator = categoryNumber => ({
	type: SET_CATEGORY,
	categoryNumber,
})
export const setCategory = categoryNumber => dispatch => {
	dispatch(setCategoryCreator(categoryNumber))
}
//====================================================================================

//======================SETTING DIFFICULTY OF QUESTIONS=================================
// it's called when user selects it in starting menu the category of Q
const setDifficultyCreator = difficulty => ({
	type: SET_DIFFICULTY,
	difficulty,
})
export const setDifficulty = difficulty => dispatch => {
	dispatch(setDifficultyCreator(difficulty))
}
//====================================================================================

//======================UPLOADS NEW PORTION OF QUESTION===============================
const uploadQuestionsCreator = questions => ({
	type: UPLOAD_NEW_QUESTIONS,
	questions,
})

export const uploadNewQ = (category, difficulty) => async dispatch => {
	let response = await quizAPI.getQuestions(category, difficulty)

	if (response.response_code === 0) {
		dispatch(uploadQuestionsCreator(response.results))
		dispatch(setCurrentQCreator())
	} else dispatch(errorCreator())
}
//====================================================================================

//===========================RESETS NEEDED PARTS OF STATE=============================
// is triggered from *error 404* and *game over* pages

const resetStateCreator = () => ({
	type: RESET_STATE,
})
export const resetState = () => dispatch => {
	dispatch(resetStateCreator())
}
//====================================================================================

//===========================PREOCESS SKIPPING OF QUESTION=============================
const skipCurrentQuestionCreator = () => ({
	type: SKIP_QUESTION,
})
export const skipCurrentQuestion = () => dispatch => {
	dispatch(skipCurrentQuestionCreator())
}
//=====================================================================================

export default quizReducer
