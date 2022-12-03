import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './redux/redux-store'
import { Provider } from 'react-redux'
import StartingPage from './components/StartingPage/StartingPage'
import QuizConnected from './components/Quiz/QuizContainer'

const App = () => {
	console.log('Testing log...')
	return (
		<div>
			<BrowserRouter>
				<Provider store={store}>
					<Routes>
						<Route path='/quiz' element={<QuizConnected />} />
						<Route path='/' element={<StartingPage />} />
					</Routes>
				</Provider>
			</BrowserRouter>
		</div>
	)
}

export default App
