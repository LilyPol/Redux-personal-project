// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);

        case types.UPDATE_TASK:
            return state.map(
                (task) =>
                    fromJS(
                        action.payload.find(({ id }) => id === task.get('id'))
                    ) || task
            );

        case types.FILL_TASKS:
            return fromJS(action.payload);

        case types.COMPLETE_ALL_TASKS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
