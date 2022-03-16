import { types } from '../../src/actions/timeActions';
import reducer from '../../src/reducers/timeReducer';

describe('Time reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            timeRemaining: 0,
        });
    });

    it('should set remaining time', () => {
        const action = {
            type: types.SET_REMAINING_TIME,
            timeRemaining: 234,
        }
        expect(reducer(undefined, action)).toEqual({
            timeRemaining: 234,
        });
    });
});
