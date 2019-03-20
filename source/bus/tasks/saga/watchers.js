// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import {
    fetchTasks,
    createTask,
    removeTask,
    updateTask,
    completeAllTasks
} from './workers';

function* watchFetchTasks () {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchCreateTask () {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchRemoveTask () {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchUpdateTask () {
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTask);
}

function* watchCompleteAllTasks () {
    yield takeEvery(types.COMPLETE_ALL_TASKS_ASYNC, completeAllTasks);
}

export function* watchTasks () {
    yield all([
        call(watchFetchTasks),
        call(watchCreateTask),
        call(watchRemoveTask),
        call(watchUpdateTask),
        call(watchCompleteAllTasks)
    ]);
}
