import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'react-redux';
import rootReducer from '../reducer/index.js'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))