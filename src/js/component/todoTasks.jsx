import React from "react";
import PropTypes from "prop-types";

const TodoTasks = ({ tasks, handleDelete, handleDeleteList }) => {
	return (
		<>
			<section className="task-list">
				<h2>Tasks</h2>
				{tasks.map((item, index) => (
					<div key={index} id="tasks">
						<div className="task">
							<div className="newTask">{item.label}</div>
							<div className="actions">
								<button
									className="delete"
									onClick={() => handleDelete(index)}>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</section>
			<section className="erase-tasks">
				<button
					type="button"
					id="new-task-submit"
					onClick={handleDeleteList}>
					Delete All Tasks
				</button>
			</section>
		</>
	);
};

TodoTasks.propTypes = {
	tasks: PropTypes.array,
};

export default TodoTasks;
