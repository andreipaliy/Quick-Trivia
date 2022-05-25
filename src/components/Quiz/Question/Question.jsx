import React from 'react'
import styles from './Question.module.css'

class Question extends React.Component {
	timer
	state = {
		time: this.props.speed / 1000,
		selectedResponse: null,
	}
	selectResponse(e) {
		debugger
		this.setState({ selectedResponse: e.target.innerText })
	}
	componentDidMount() {
		debugger
		if (this.props.answers.length) {
			this.timer =
				this.props.answers.length > 0
					? setInterval(
							() =>
								this.setState({
									time: this.state.time - 1,
								}),
							1000
					  )
					: null
		}
	}
	componentDidUpdate(prevProps) {
		debugger

		if (prevProps !== this.props) {
			clearInterval(this.timer)
			this.setState({ time: this.props.speed / 1000 })
			this.timer =
				this.props.answers.length > 0
					? setInterval(
							() =>
								this.setState({
									time: this.state.time - 1,
								}),
							1000
					  )
					: null
		}
		if (this.state.time === 0 && prevProps === this.props)
			this.props.submitResponse()
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		debugger
		return (
			<div className={styles.questionBlock}>
				<div className={styles.timer}>
					{':' + this.state.time + ' seconds'}
				</div>
				<h3 className={styles.question}>{this.props.question}</h3>
				<ul className={styles.variants}>
					{this.props.answers.map((answer, i) => {
						return (
							<button
								key={i}
								type={
									this.props.answers.length > 2
										? 'input'
										: 'checkbox'
								}
								className={styles.variant}
								onClick={this.selectResponse.bind(this)}
							>
								{answer}
							</button>
						)
					})}
				</ul>
				<button
					className={styles.submitBtn}
					onClick={() => {
						debugger
						this.props.submitResponse(this.state.selectedResponse)
					}}
				>
					Submit
				</button>
				<div className={styles.points}>
					<a
						href='#'
						onClick={this.props.skipQ}
						className={styles.skipBtn}
					>
						Skip
					</a>
					<span className={styles.diamond}>
						{this.props.diamondPoints}
					</span>
					<span className={styles.dummyDiamond}>
						{this.props.dummyPoints}
					</span>
				</div>
			</div>
		)
	}
}

export default Question
