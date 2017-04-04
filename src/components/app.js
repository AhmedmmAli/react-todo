import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-List';


var todos = JSON.parse(localStorage.getItem('todos')) || [];
export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos
		};
	}
	render() {
		return (
			<div>
				<h1>React Todo App</h1>
				<h5>Red: Not Done<br/>Green: Done</h5>
				<CreateTodo 
				todos={this.state.todos}
				createTask = {this.createTask.bind(this)}
				/>
				<TodosList
				 todos={this.state.todos}
				 changeTask={this.changeTask.bind(this)}
				 editTask={this.editTask.bind(this)}
				 deleteTask={this.deleteTask.bind(this)}
				 />
			</div>
			);
	}

	changeTask(task) {
		const foundTodo = _.find(this.state.todos, todo =>todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({todos: this.state.todos}) 

	}
	createTask(task) {
		this.state.todos.push({
			task,
			isCompleted: false
		});
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({todos: this.state.todos});

	}
	
	editTask(oldTask, newTask){
		const foundTodo = _.find(this.state.todos, todo =>todo.task === oldTask);
		foundTodo.task = newTask;
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({todos:this.state.todos});
	}
	deleteTask(tasktodelete){
		_.remove(this.state.todos, todo =>todo.task === tasktodelete);
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({todos:this.state.todos});
	}
}