import { connect } from 'react-redux'
import React from 'react'
import Quiz from './Quiz'
import Fail from './Fail/Fail'
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
	componentDidMount() {
		debugger
		this.props.getQuestions(this.props.category)
	}
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
	submitResponse = event => {
		debugger
		if (event) this.props.checkResponse(event.target.innerText)
		else this.props.checkResponse(null)
	}
	skipQ = () => {
		debugger
		this.props.skipCurrentQuestion()
	}

	render() {
		return (
			<>
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
						skippedQcounter={this.props.skippedQcounter}
					/>
				) : (
					<img
						className={styles.preloader}
						src={Preloader}
						alt='preloader'
					/>
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
