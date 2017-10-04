import  { FETCH_COMMENTS, CREATE_COMMENT } from '../actions/index';
import { change } from 'redux-form'; 


const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
    // case FETCH_POST:
    //     return { ...state, post: action.payload.val() };

    case FETCH_COMMENTS:
        console.log('FETCH_COMMENTS :',  _.map(action.payload.val(), post => post ) );
        return { ...state, all: _.map(action.payload.val(), comment => comment) };
    
    default:
        console.log('reducer_comment inside :', action);
        return state;
    }
}

import Redux from 'redux';