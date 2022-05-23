// The Fisher-Yates suffle algorith
export const shuffleArr = array => {
	let shuffled = array
		.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)
	return shuffled
}
