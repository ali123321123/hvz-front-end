import {createStore} from 'redux'
import loginStore from './loginReducer'

const store = createStore(loginStore)

export default store;
