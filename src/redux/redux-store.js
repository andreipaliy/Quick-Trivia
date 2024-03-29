import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import quizReducer from './quizReducer'

let reducers = combineReducers({
	quizPage: quizReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
