import React, { useState, useEffect } from "react";
import TodoTasks from "./todoTasks.jsx";

const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user/";

const Home = () => {
	// Definidiendo estados iniciales

	let initialState = { label: "", done: false };

	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState(initialState);
	const [error, setError] = useState(false);

	// Handle Change/Submit

	const handleChange = (event) => {
		setNewTask({ ...newTask, [event.target.name]: event.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// GET

	async function getTodoList() {
		try {
			let response = await fetch(`${URL_BASE}rafmanrique`);
			let results = await response.json();
			if (response.ok) {
				setTasks(results);
			} else {
				addNewUser();
			}
		} catch (error) {
			console.log(error);
		}
	}

	// POST

	async function addNewUser() {
		try {
			let response = await fetch(`${URL_BASE}rafmanrique`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify([]),
			});
			if (response.ok) {
				getTodoList();
			} else {
				alert(`Error al crear usuario${response.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	// Agregar tareas (PUT)

	async function handleAddTask() {
		try {
			let response = await fetch(`${URL_BASE}rafmanrique`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify([...tasks, newTask]),
			});
			if (response.ok) {
				getTodoList();
				setError(false);
				setNewTask(initialState);
			} else {
				console.log(response.status);
			}
		} catch {
			console.log(error);
		}
	}

	// Eliminar tareas (PUT)

	async function handleDelete(id) {
		let newTasks = tasks.filter((item, index) => index != id);
		try {
			let response = await fetch(`${URL_BASE}rafmanrique`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(newTasks),
			});
			if (response.ok) {
				setNewTask({ label: "", done: false });
				getTodoList();
			} else {
				return;
			}
		} catch {
			console.log(error);
		}
	}

	// Eliminar lista completa (DELETE)

	async function handleDeleteList() {
		try {
			let response = await fetch(`${URL_BASE}rafmanrique`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				getTodoList();
				setError(false);
			} else {
				console.log(response.status);
			}
		} catch {
			console.log(error);
		}
	}

	useEffect(() => {
		getTodoList();
	}, []);

	return (
		<>
			<header>
				<h1>Task List 2022 (You have {tasks.length} tasks pending)</h1>
				<form id="new-task-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="label"
						id="new-task-input"
						placeholder="Add a New Task"
						onChange={handleChange}
						value={newTask.label}
					/>
					<button
						type="button"
						id="new-task-submit"
						onClick={handleAddTask}>
						Add Task
					</button>
				</form>
			</header>
			<main>
				<TodoTasks
					tasks={tasks}
					handleDelete={handleDelete}
					handleDeleteList={handleDeleteList}
				/>
			</main>
		</>
	);
};

export default Home;
