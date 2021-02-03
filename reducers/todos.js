import * as types from '../constants/ActionTypes';

const initialState = [{
    id: 0,
    text: 'Go to bed',
    completed: false
}]

export default todos = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TODO:
            return [
                ...state,
                {
                    id: state.length.toString(),
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state;
    }
}