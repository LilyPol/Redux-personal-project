// Core
import { Map } from 'immutable';

// Types
import { types } from './types';

const initialState = Map({
    isSpinning: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isSpinning', true);

        case types.STOP_FETCHING:
            return state.set('isSpinning', false);

        default:
            return state;
    }
};
