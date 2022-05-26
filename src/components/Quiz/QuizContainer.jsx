import React from 'react'
import { connect } from 'react-redux'
import Question from './Question/Question'
import Fail from './Fail/Fail'
import ErrorQ from './Error/ErrorQ'
import styles from './QuizContainer.module.css'
import {
	getQuestions,
	checkResponse,
	changeCurrentQ,
	uploadNewQ,
	resetState,
	skipCurrentQuestion,
} from '../../redux/quizReducer'

class QuizContainer extends React.Component {
	componentDidMount() {
		this.props.getQuestions(this.props.category, this.props.difficulty)
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.diamondPoints < this.props.diamondPoints ||
			prevProps.dummyPoints < this.props.dummyPoints
		) {
			this.props.questionsRemains // if there's not enough question - get another portion
				? this.props.changeCurrentQ()
				: this.props.uploadNewQ(this.props.category)
		}
	}
	submitResponse = response => {
		if (response) this.props.checkResponse(response)
		else this.props.checkResponse(null) // is triggered if time is over
	}
	skipQ = () => {
		this.props.skipCurrentQuestion()
	}

	render() {
		return (
			<>
				{this.props.error && ( // if variable error from redux is true - ErrorPage is displayed
					<ErrorQ resetState={this.props.resetState} />
				)}
				{this.props.diamondPoints > this.props.dummyPoints && // if true - game continues
				this.props.currentQ ? (
					<Question
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
						failedQ={this.props.failedQ}
						skippedQcounter={this.props.skippedQcounter}
						getQuestions={this.props.getQuestions}
						resetState={this.props.resetState}
						category={this.props.category}
						difficulty={this.props.difficulty}
					/>
				) : (
					<>
						{this.props.error ? null : ( // if it's not error but just waiting server to answer
							<div className={styles.preloader} />
						)}
					</>
				)}
			</>
		)
	}
}

function mapStateToProps(state) {
	// date from redux
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
	// functions from redux
	getQuestions,
	checkResponse,
	changeCurrentQ,
	uploadNewQ,
	resetState,
	skipCurrentQuestion,
})(QuizContainer)
