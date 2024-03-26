import '../src/assets/style/main.css'

import { Provider } from 'react-redux'

import { store } from './store/store'

import { AppHeader } from './cmps/AppHeader'

export function App() {
  return (
    <Provider store={store}>
      <section className="app">
        <AppHeader />
      </section>
    </Provider>
  )
}
