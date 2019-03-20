// Types
import { types } from './types';

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },
    updateTask: (task) => {
        return {
            type:    types.UPDATE_TASK,
            payload: task,
        };
    },
    removeTask: (id) => {
        return {
            type:    types.REMOVE_TASK,
            payload: id,
        };
    },
    completeAllTasks: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS,
            payload: tasks,
        };
    },

    // Async
    fetchTasksAsync: () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },
    createTaskAsync: (message) => {
        return {
            type:    types.CREATE_TASK_ASYNC,
            payload: message,
        };
    },
    updateTaskAsync: (task) => {
        return {
            type:    types.UPDATE_TASK_ASYNC,
            payload: task,
        };
    },
    removeTaskAsync: (id) => {
        return {
            type:    types.REMOVE_TASK_ASYNC,
            payload: id,
        };
    },
    completeAllTasksAsync: (tasks) => {
        return {
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: tasks,
        };
    },
};
