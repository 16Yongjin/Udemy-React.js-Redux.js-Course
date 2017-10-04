import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/index';
import _ from 'lodash';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    case FETCH_POST:
        return { ...state, post: action.payload.val() };

    case FETCH_POSTS:
        // console.log( _.map(action.payload.val(), post => post ) );
        return { ...state, all: _.map(action.payload.val(), post => post).reverse()};
    
    default:
        console.log('reducer_posts inside : ', action);
        return state;
    }
}

import Redux from 'redux';