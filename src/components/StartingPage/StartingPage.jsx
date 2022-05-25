import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StartingPage.module.css'
import { setSpeed, setCategory, setDifficulty } from '../../redux/quizReducer'
import { connect } from 'react-redux'
import { useState } from 'react'

const StartingPage = props => {
	const categories = {
		any: 'Any Category',
		9: 'General Knowledge',
		10: 'Entertainment: Books',
		11: 'Entertainment: Film',
		12: 'Entertainment: Music',
		13: 'Entertainment: Musicals and Theatres',
		14: 'Entertainment: Television',
		15: 'Entertainment: Video Games',
		16: 'Entertainment: Board Games',
		17: 'Science and Nature',
		18: 'Science: Computers',
		19: 'Science: Mathematics',
		20: 'Mythology',
		21: 'Sports',
		22: 'Geography',
		23: 'History',
		24: 'Politics',
		25: 'Art',
		26: 'Celebrities',
		27: 'Animals',
		28: 'Vehicles',
		29: 'Entertainment: Comics',
		30: 'Science: Gadgets',
		31: 'Entertainment: Japanese Anime and Manga',
		32: 'Entertainment: Cartoon and Animations',
	}
	const setSpeed = e => props.setSpeed(e.target.innerText)
	const setDifficulty = e => {
		props.setDifficulty(e.target.innerText.toLowerCase())
	}
	const setCategory = e => {
		setCategoryString(categories[e.target.dataset.value])
		props.setCategory(e.target.dataset.value)
	}
	let [categoryString, setCategoryString] = useState(
		categories[props.category]
	)
	return (
		<div className={styles.mainPage}>
			<h1 className={styles.header}>Starting Quick Trivia</h1>
			<div className={styles.buttons}>
				<div className={styles.intructions}>Instructions</div>
				<div className={styles.dropdown}>
					<button className={styles.dropbtn}>
						{props.speed
							? props.speed / 1000 + ' seconds'
							: 'Select speed'}
					</button>
					<div className={styles.dropdownContent} onClick={setSpeed}>
						<span>5 seconds</span>
						<span>10 seconds</span>
						<span>15 seconds</span>
						<span>20 seconds</span>
						<span>25 seconds</span>
						<span>30 seconds</span>
						<span>35 seconds</span>
						<span>40 seconds</span>
						<span>45 seconds</span>
						<span>50 seconds</span>
						<span>55 seconds</span>
						<span>60 seconds</span>
					</div>
				</div>
				<div className={styles.dropdown}>
					<button className={styles.dropbtn}>{categoryString}</button>
					<div
						className={styles.dropdownContent}
						onClick={setCategory}
					>
						<span data-value='any'>Any Category</span>
						<span data-value='9'>General Knowledge</span>
						<span data-value='10'>Entertainment: Books</span>
						<span data-value='11'>Entertainment: Film</span>
						<span data-value='12'>Entertainment: Music</span>
						<span data-value='13'>
							Entertainment: Musicals and Theatres
						</span>
						<span data-value='14'>Entertainment: Television</span>
						<span data-value='15'>Entertainment: Video Games</span>
						<span data-value='16'>Entertainment: Board Games</span>
						<span data-value='17'>Science and Nature</span>
						<span data-value='18'>Science: Computers</span>
						<span data-value='19'>Science: Mathematics</span>
						<span data-value='20'>Mythology</span>
						<span data-value='21'>Sports</span>
						<span data-value='22'>Geography</span>
						<span data-value='23'>History</span>
						<span data-value='24'>Politics</span>
						<span data-value='25'>Art</span>
						<span data-value='26'>Celebrities</span>
						<span data-value='27'>Animals</span>
						<span data-value='28'>Vehicles</span>
						<span data-value='29'>Entertainment: Comics</span>
						<span data-value='30'>Science: Gadgets</span>
						<span data-value='31'>
							Entertainment: Japanese Anime and Manga
						</span>
						<span data-value='32'>
							Entertainment: Cartoon and Animations
						</span>
					</div>
				</div>
				<div className={styles.dropdown}>
					<button className={styles.dropbtn}>
						{props.difficulty
							? props.difficulty.charAt(0).toUpperCase() +
							  props.difficulty.slice(1)
							: 'Select difficulty'}
					</button>
					<div
						className={styles.dropdownContent}
						onClick={setDifficulty}
					>
						{' '}
						<span>Any</span>
						<span>Easy</span>
						<span>Medium</span>
						<span>Hard</span>
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
	category: state.quizPage.category,
	difficulty: state.quizPage.difficulty,
})

export default connect(mapStateToProps, {
	setSpeed,
	setCategory,
	setDifficulty,
})(StartingPage)
