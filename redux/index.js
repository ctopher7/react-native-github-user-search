import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import MainScreen from './reducers/MainScreen'

const rootReducer = combineReducers({
    MainScreen
});
  
export default createStore(rootReducer,applyMiddleware(thunk));