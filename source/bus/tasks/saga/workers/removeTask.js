// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* removeTask ({ payload: id }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.remove, [id]);

        if (response.status !== 204) {
            const { message } = yield apply(response, response.json);

            throw new Error(message);
        }

        yield put(tasksActions.removeTask(id));
    } catch (error) {
        yield put(uiActions.emitError(error.message, 'removeTask worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
