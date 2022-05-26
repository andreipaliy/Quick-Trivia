import React from 'react'
import styles from './Fail.module.css'
import { Link } from 'react-router-dom'
class Fail extends React.Component {
	startNewGame = () => {
		this.props.getQuestions(this.props.category, this.props.difficulty)
	}
	resetData = () => {
		this.props.resetState()
	}
	componentWillUnmount() {}
	render() {
		return (
			<div className={styles.failPage}>
				<h1>The quiz is over...</h1>
				<button
					className={styles.tryAgainBtn}
					onClick={this.startNewGame}
				>
					Try Again
				</button>
				<Link
					to='/'
					className={styles.tryAgainBtn}
					onClick={this.resetData}
				>
					Change settings
				</Link>
				<div className={styles.line}></div>
				<div className={styles.statistics}>
					<div className={styles.statisticsItem}>
						<p>Correct answers: </p>
						<h1 className={styles.countQuestionsPassed}>
							{this.props.passedQ.length}
						</h1>
					</div>

					<div className={styles.statisticsItem}>
						<p>Incorect answers: </p>
						<h1 className={styles.countQuestionsPassed}>
							{this.props.failedQ.length}
						</h1>
					</div>
					<div className={styles.statisticsItem}>
						<p>Skipped Questions: </p>
						<h1 className={styles.countQuestionsPassed}>
							{this.props.skippedQcounter}
						</h1>
					</div>
				</div>
				<div className={styles.summarSection}>
					<div>
						{this.props.failedQ.map((item, i) => {
							return (
								<div key={i} className={styles.failedQItem}>
									<h4 className={styles.summaryQheader}>
										Failed Question{' '}
										{i +
											1 +
											'/' +
											this.props.failedQ.length}
									</h4>
									<p>
										<b>Question: </b>
										{item.question}
									</p>
									<p>
										<b>Correct answer: </b>
										{item.correct_answer}
									</p>
								</div>
							)
						})}
					</div>
					<div className={styles.correctQResponded}>
						{this.props.passedQ.map((item, i) => {
							return (
								<div key={i} className={styles.QItem}>
									<h4 className={styles.summaryQheader}>
										Passed Question{' '}
										{i +
											1 +
											'/' +
											this.props.passedQ.length}
									</h4>
									<p>
										<b>Question: </b>
										{item.question}
									</p>
									<p>
										<b>Your correct answer: </b>
										{item.correct_answer}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Fail
