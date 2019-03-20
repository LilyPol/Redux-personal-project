// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
import { tasks } from './tasks';
import { sortTasksByGroup } from '../../instruments/helpers';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';
import { Control, Form, actions as formsActions } from 'react-redux-form/lib/immutable';
import { tasksActions } from '../../bus/tasks/actions';


const mapStateToProps = (state) => {
    return {
        tasks:      state.tasks,
        newMessage: state.forms.newTask.get('message'),
        filter:     state.forms.search.get('filterMessage'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ...bindActionCreators({ ...tasksActions }, dispatch),
            clearMessage: () => {dispatch(formsActions.change('forms.newTask.message', ''));},
        },
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;
        actions.fetchTasksAsync();
    }

    _createTask = () => {
        const { newMessage,
                actions: { createTaskAsync, clearMessage },
        } = this.props;

        if (newMessage.trim()) {
            createTaskAsync(newMessage);
            clearMessage();
        }
    };

    _filterTasks = () => {
        const { tasks, filter } = this.props;

        if (filter) {
            return sortTasksByGroup(
                tasks.filter((task) =>
                    task .get('message')
                         .toUpperCase()
                         .includes(filter.toUpperCase())
                )
            );
        }
        return sortTasksByGroup(tasks);
    };

    _updateTasksFilter = (e) => {
        const { value } = e.target;
        this.setState({tasksFilter: value.toLocaleLowerCase()});
    };

    _completeAllTasks = () => {
        const { tasks, actions } = this.props;
        const allCompleted = tasks.every((task) => task.get('completed'));

        if (allCompleted) {return null}

        const completedTasks = tasks.map((task) => task.set('completed', 'true'));
        actions.completeAllTasks(completedTasks);
    };

    _getAllCompleted = () => {
        const { tasks } = this.props;
        return tasks.every((task) => task.get('completed'));
    };

    render () {
        const { actions, newMessage } = this.props;
        const getAllCompleted = this._getAllCompleted();
        const list = this._filterTasks();
        const todoList = list.map((task) => (
            <Catcher key = { task.get('id') }>
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    message = { task.get('message') }
                    { ...task }
                />
            </Catcher>
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Control.text
                            model = 'forms.search.filterMessage'
                            placeholder = 'Поиск'
                            type = 'search'
                        />                        
                    </header>
                    <section>
                        <form
                            noValidate
                            model = 'forms.newTask'
                            onSubmit = { this._createTask }>
                            <Control.text
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = 'forms.newTask.message'
                                placeholder = 'Описание моей новой задачи'
                                value = { newMessage }
                            />
                            <button>Добавить задачу</button>
                        </form> 
                        <div className = { Styles.overlay }>
                            <ul>{todoList}</ul>
                        </div>                        
                    </section>
                    <footer>
                        <Checkbox
                            checked = { getAllCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}

export default Scheduler;
