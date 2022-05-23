import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StartingPage.module.css'
import { setSpeed } from '../../redux/quizReducer'
import { connect } from 'react-redux'

const StartingPage = props => {
	const setSpeed = e => {
		props.setSpeed(e.target.innerText)
	}
	return (
		<div className={styles.mainPage}>
			<h1 className={styles.header}>Starting Quick Trivia</h1>
			<div className={styles.buttons}>
				<div className={styles.dropdown}>
					<button className={styles.dropbtn}>
						{props.speed
							? props.speed / 1000 + ' seconds'
							: 'Select speed'}
					</button>
					<div className={styles.dropdownContent}>
						<span onClick={setSpeed}>5 seconds</span>
						<span onClick={setSpeed}>10 seconds</span>
						<span onClick={setSpeed}>35 seconds</span>
						<span onClick={setSpeed}>45 seconds</span>
						<span onClick={setSpeed}>60 seconds</span>
					</div>
				</div>
				<Link to='/quiz' className={styles.playBtn}>
					Play
				</Link>
			</div>
		</div>
	)
}
const mapStateToProps = state => ({
	speed: state.quizPage.speed,
})

export default connect(mapStateToProps, { setSpeed })(StartingPage)
