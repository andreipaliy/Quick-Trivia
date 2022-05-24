import { connect } from 'react-redux'
import React from 'react'
import Quiz from './Quiz'
import Fail from './Fail/Fail'
import {
	getQuestions,
	checkResponse,
	changeCurrentQ,
} from '../../redux/quizReducer'
import Preloader from '../../assets/Preloader.gif'
import styles from './QuizContainer.module.css'

class QuizContainer extends React.Component {
	componentDidMount() {
		this.props.getQuestions()
	}
	componentDidUpdate(prevProps) {
		if (
			this.props.continue &&
			prevProps.passedQ.length < this.props.passedQ.length
		) {
			this.props.changeCurrentQ()
		}
	}
	submitResponse = event => {
		if (event) this.props.checkResponse(event.target.innerText)
		else this.props.checkResponse(null)
	}

	render() {
		return (
			<>
				{this.props.continue ? (
					// this.props.currentQ ? (
					<Quiz
						question={this.props.currentQ.question}
						answers={this.props.currentQ.answers}
						submitResponse={this.submitResponse}
						speed={this.props.speed}
					/>
				) : this.props.currentQ ? (
					<Fail
						passedQ={this.props.passedQ}
						getQuestions={this.props.getQuestions}
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
		continue: state.quizPage.continue,
		passedQ: state.quizPage.passedQ,
		speed: state.quizPage.speed,
	}
}

export default connect(mapStateToProps, {
	getQuestions,
	checkResponse,
	changeCurrentQ,
})(QuizContainer)
