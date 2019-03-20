import { Map } from 'immutable';
import { combineForms } from 'react-redux-form/lib/immutable';

const newTask = Map({
    message: '',
});

const edit = Map({
    editMessageId: '',
    editedMessage: '',
});

const search = Map({
    filterMessage: '',
}); 

export const formsReducer = combineForms(
    {
        newTask,        
        edit,            
        search,
    },
    'forms'
);
