import { types } from '../actions/timeActions';

const defaultState = {
    timeRemaining: 0,
};

export default function (state = defaultState, action) {
    switch (action.type) {
    case types.SET_REMAINING_TIME:
        return {
            ...state,
            timeRemaining: action.timeRemaining,
        };

    default:
        return state;
    }
}
