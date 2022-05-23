import styles from './Preloader.module.css'
import React from 'react'
const Preloader = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.loader}></div>
		</div>
	)
}

export default Preloader
