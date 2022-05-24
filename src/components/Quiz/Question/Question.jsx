import React from 'react'
import styles from './Question.module.css'

class Question extends React.Component {
	timer
	state = {
		time: this.props.speed / 1000,
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
		if (this.state.time === 0) this.props.submitResponse()
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
				<h2 className={styles.question}>{this.props.question}</h2>
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
								onClick={this.props.submitResponse}
							>
								{answer}
							</button>
						)
					})}
				</ul>
				<div className={styles.points}>
					<span className={styles.diamond}>0</span>
					<span className={styles.dummyDiamond}>0</span>
					<span></span>
				</div>
			</div>
		)
	}
}

export default Question
