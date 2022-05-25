import React from 'react'
import styles from './ErrorQ.module.css'
import { Link } from 'react-router-dom'
import errorImage from '../../../assets/error.png'

class ErrorQ extends React.Component {
	render() {
		return (
			<div>
				<img src={errorImage} className={styles.errorImg} />
				<p className={styles.errorSugestion}>
					Maybe you would like to choose other settings or come back
					later?
				</p>
				<Link
					to='/'
					className={styles.goBackBtn}
					onClick={this.props.resetState}
				>
					Go back
				</Link>
			</div>
		)
	}
}
export default ErrorQ
