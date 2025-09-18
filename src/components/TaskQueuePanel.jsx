// src/components/TaskQueuePanel.jsx

import React from 'react';
import TaskItem from './TaskItem';

// Sub-component for Add Task Button
const AddTaskButton = ({ onClick }) => (
  <button className="add-task-btn" onClick={onClick}>ADD RANDOM TASK</button>
);

// Sub-component for Admit Task Button
const AdmitTaskButton = ({ onClick, isDisabled }) => (
  <button className="admit-task-btn" onClick={onClick} disabled={isDisabled}>ADMIT TASK</button>
);

// component: displays task queue and controls
const TaskQueuePanel = ({ tasks, addTask, admitTask, highPriorityThreshold }) => {
  const isAdmitDisabled = tasks.length === 0;

  return (
    <div className="task-queue-panel">
      <AddTaskButton onClick={addTask} />
      <h2>Task Queue</h2>
      <div className="task-list-display">
        {/* map: tasks to display */}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            duration={task.duration} // Still pass actual duration for priority coloring
            isHighPriority={task.duration <= highPriorityThreshold}
            displayValue={task.queueNumber} // New prop for queue number display
            isQueueNumberDisplay={true} // Indicate it's a queue number
          />
        ))}
      </div>
      <AdmitTaskButton onClick={admitTask} isDisabled={isAdmitDisabled} />
    </div>
  );
};

export default TaskQueuePanel;