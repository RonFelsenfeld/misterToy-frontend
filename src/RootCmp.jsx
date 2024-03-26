import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '../src/assets/style/main.css'

import { store } from './store/store'

import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'

import { AppHeader } from './cmps/AppHeader'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/toy" element={<ToyIndex />}></Route>
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
