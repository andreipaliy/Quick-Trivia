import styles from './Fail.module.css'
import { Link } from 'react-router-dom'
const Fail = props => {
	const startNewGame = () => {
		props.getQuestions()
	}
	return (
		<div className={styles.failPage}>
			<h1>The quiz is over...</h1>
			<button className={styles.tryAgainBtn} onClick={startNewGame}>
				Try Again
			</button>
			<Link to='/' className={styles.tryAgainBtn}>
				Menu
			</Link>
			<div className={styles.line}></div>
			<p>Correct answers: </p>
			<h1 className={styles.countQuestionsPassed}>
				{props.passedQ.length}
			</h1>
			<div className={styles.summarSection}>
				<div className={styles.correctQResponded}>
					{props.passedQ.map((item, i) => {
						return (
							<div key={i} className={styles.QItem}>
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

export default Fail
