// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

import { tasksActions } from '../../bus/tasks/actions';
import { actions as formsActions, Control } from 'react-redux-form/lib/immutable';

const mapStateToProps = (state, props) => {
    return {
        tasks:         state.tasks,
        edit:          state.forms.edit,
        editedMessage: state.forms.edit.get('editedMessage'),
        isTaskEditing: state.forms.edit.get('editMessageId') === props.id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ...bindActionCreators({ ...tasksActions }, dispatch),
            editTask: (message, id = null) => {
                dispatch(formsActions.change('forms.edit.editedMessage', message));
                dispatch(formsActions.change('forms.edit.editMessageId', id));                
            },
        },
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Task extends PureComponent {
    _updateTask = (params) => {
        const { id, message, completed, favorite, actions } = this.props;
        const editedTask = { id, message, completed, favorite, ...params };

        actions.updateTaskAsync([editedTask]);
    };

    _updateTaskMessageOnClick = () => {
        const { id, message, isTaskEditing, actions: { editTask } } = this.props;

        if (isTaskEditing) {
            editTask(message);
            return null;
        }

        editTask(message, id);
    };

    _updateTaskMessageOnKeyDown = (e) => {
        const { message, editedMessage, actions: { editTask } } = this.props;

        if (e.key === 'Enter' && editedMessage.trim()) {
            this._updateTask({ message: editedMessage });
            editTask(editedMessage);
        }

        if (e.key === 'Escape') {
            editTask(message);
        }
    };

    _removeTask = () => {
        const { actions, id } = this.props;
        actions.removeTaskAsync(id);
    };

    _toggleTaskFavoriteState = () => {
        this._updateTask({ favorite: !this.props.favorite });
    };

    _toggleTaskCompletedState = () => {
        this._updateTask({ completed: !this.props.completed });
    };    

    render () {
        const { message, completed, favorite, isTaskEditing, editedMessage, } = this.props;
        console.log('render Task=', this.props);

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        onClick = { this._toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                    />
                    <Control.text
                        disabled = { !isTaskEditing }
                        getRef = { (node) => node && node.focus() }
                        maxLength = { 50 }
                        model = 'forms.edit.editedMessage'
                        value = { isTaskEditing ? editedMessage : message }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />                    
                </div>
                <div className = { Styles.actions }>
                    <Star                        
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        onClick = { this._toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Edit
                        inlineBlock
                        checked = { false }                        
                        className = { Styles.updateTaskMessageOnClick }
                        onClick = { this._updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        onClick = { this._removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                    />
                </div>
            </li>
        );
    }
}

export default Task;
