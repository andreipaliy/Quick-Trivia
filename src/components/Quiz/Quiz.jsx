// import Preloader from '../common/Preloader/Preloader'
import React from 'react'
import Question from './Question/Question'

class Quiz extends React.Component {
	render() {
		debugger
		return (
			<>
				<Question
					question={this.props.question}
					answers={this.props.answers}
					submitResponse={this.props.submitResponse}
					speed={this.props.speed}
				/>
			</>
		)
	}
}

export default Quiz
