import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import '../src/assets/style/main.css'
import { store } from './store/store'

import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { Dashboard } from './pages/Dashboard'

import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app main-layout">
          <AppHeader />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/toy" element={<ToyIndex />}></Route>
              <Route path="/toy/:toyId" element={<ToyDetails />}></Route>
              <Route path="/toy/edit/:toyId?" element={<ToyEdit />}></Route>
            </Routes>
          </main>
        </section>

        <UserMsg />
      </Router>
    </Provider>
  )
}
