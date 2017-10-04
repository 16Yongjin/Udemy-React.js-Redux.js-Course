import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer,
  comments: CommentsReducer
});

export default rootReducer;
