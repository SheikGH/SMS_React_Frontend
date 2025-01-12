// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import studentReducer from './reducers/studentReducer';
import familyMemberReducer from './reducers/familyMemberReducer';

const rootReducer = combineReducers({
  students: studentReducer,
  familyMembers: familyMemberReducer
});

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;