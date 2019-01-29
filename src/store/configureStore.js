import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import Global from '../constants/Global'

var buildStore

if (Global.DEBUG) {
    buildStore = compose(
        applyMiddleware(thunk),
        // require('redux-devtools').devTools(),
        // require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)
} else {
    buildStore = compose(applyMiddleware(thunk))(createStore)
}

export default function configureStore(initialState) {
  const store = buildStore(rootReducer, initialState)

  if(module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(require('./reducers'))
    })
  }
  return store
}
