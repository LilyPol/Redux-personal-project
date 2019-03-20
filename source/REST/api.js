// Instruments
import { MAIN_URL, TOKEN } from './config';

export const api = {
    tasks: {
        create (message) {
            return fetch(MAIN_URL, {
                method:  'POST',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
        },
        update (task) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify(task),
            });
        },
        remove (id) {
            return fetch(`${MAIN_URL}/${id}`, {
                method:  'DELETE',
                headers: {
                    authorization: TOKEN,
                },
            });
        },
        fetch () {
            return fetch(MAIN_URL, {
                method:  'GET',
                headers: {
                    authorization: TOKEN,
                },
            });
        },
        completeAll (tasks) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify(tasks),
            });
        },
    },
};
