// state는 reducer가 처리함
export default function(state = null, action) {
    
    switch(action.type) {
    case 'BOOK_SELECTED':
        return action.payload;
    }

    return state
}