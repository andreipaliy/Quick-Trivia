import { connect } from 'react-redux'
import React from 'react'
import Quiz from './Quiz'
import Fail from './Fail/Fail'
import ErrorQ from './Error/ErrorQ'
import {
	getQuestions,
	checkResponse,
	changeCurrentQ,
	uploadNewQ,
	resetState,
	skipCurrentQuestion,
} from '../../redux/quizReducer'
import Preloader from '../../assets/Preloader.gif'
import styles from './QuizContainer.module.css'

class QuizContainer extends React.Component {
	// catchAllUnhandledErrors = event => {
	// 	debugger
	// 	event.preventDefault()
	// 	console.log(event.reason, event.promise)
	// 	debugger
	// }
	componentDidMount() {
		debugger
		// window.addEventListener(
		// 	'unhandledrejection',
		// 	this.catchAllUnhandledErrors
		// )
		this.props.getQuestions(this.props.category, this.props.difficulty)
	}
	// componentWillUnmount() {
	// 	window.removeEventListener(
	// 		'unhandledrejection',
	// 		this.catchAllUnhandledErrors
	// 	)
	// }
	componentDidUpdate(prevProps) {
		if (
			prevProps.diamondPoints < this.props.diamondPoints ||
			prevProps.dummyPoints < this.props.dummyPoints
		) {
			this.props.questionsRemains
				? this.props.changeCurrentQ()
				: this.props.uploadNewQ(this.props.category)
		}
	}
	submitResponse = response => {
		debugger
		if (response) this.props.checkResponse(response)
		else this.props.checkResponse(null)
	}
	skipQ = () => {
		debugger
		this.props.skipCurrentQuestion()
	}

	render() {
		debugger
		return (
			<>
				{this.props.error && (
					<ErrorQ resetState={this.props.resetState} />
				)}
				{this.props.diamondPoints > this.props.dummyPoints &&
				this.props.currentQ ? (
					<Quiz
						question={this.props.currentQ.question}
						answers={this.props.currentQ.answers}
						submitResponse={this.submitResponse}
						speed={this.props.speed}
						diamondPoints={this.props.diamondPoints}
						dummyPoints={this.props.dummyPoints}
						skipQ={this.skipQ}
					/>
				) : this.props.currentQ ? (
					<Fail
						passedQ={this.props.passedQ}
						getQuestions={this.props.getQuestions}
						failedQ={this.props.failedQ}
						resetState={this.props.resetState}
						category={this.props.category}
						difficulty={this.props.difficulty}
						skippedQcounter={this.props.skippedQcounter}
					/>
				) : (
					<>
						{this.props.error ? null : (
							<div className={styles.preloader} />
						)}
					</>
				)}
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentQ: state.quizPage.currentQ,
		passedQ: state.quizPage.passedQ,
		speed: state.quizPage.speed,
		failedQ: state.quizPage.failedQ,
		diamondPoints: state.quizPage.diamondPoints,
		dummyPoints: state.quizPage.dummyPoints,
		questionsRemains: state.quizPage.questions.length,
		category: state.quizPage.category,
		skippedQcounter: state.quizPage.skippedQcounter,
		difficulty: state.quizPage.difficulty,
		error: state.quizPage.error,
	}
}

export default connect(mapStateToProps, {
	getQuestions,
	checkResponse,
	changeCurrentQ,
	uploadNewQ,
	resetState,
	skipCurrentQuestion,
})(QuizContainer)
