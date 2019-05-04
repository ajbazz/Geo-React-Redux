import { combineReducers } from 'redux';
import location from './location';
import detail from './detail';

const rootReducer = combineReducers({
  location,
  detail
});

export default rootReducer;
