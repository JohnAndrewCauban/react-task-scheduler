// src/components/QueueBox.jsx

import React from 'react';
import TaskItem from './TaskItem';
import { UNITS_PER_SECOND } from '../utils/constants';

const QueueBox = ({ title, queue, duration, isHighPriority, maxBarValue }) => {
  const queueClass = `queue-box ${isHighPriority ? 'high-priority-queue' : 'regular-queue'}`;

  const displayTotalDuration = (duration / UNITS_PER_SECOND).toFixed(1);
  const barWidthPercentage = Math.min(100, (duration / maxBarValue) * 100);


  return (
    <div className={queueClass}>
      <h3>{title}</h3>
      <p>Queue List:</p>
      <div className="queue-items-display">
        {queue.length > 0 ? (
          queue.map((task, index) => (
            <TaskItem
              key={task.id}
              duration={task.duration}
              isHighPriority={isHighPriority}
              isProcessing={index === 0}
              displayValue={task.queueNumber} // Pass the queueNumber for display
              isQueueNumberDisplay={true} // Indicate it's a queue number display
            />
          ))
        ) : (
          <p className="empty-queue-message">No tasks in queue</p>
        )}
      </div>
      <p>Duration: {displayTotalDuration}s</p>
      <div className="duration-bar-container">
        <div className="duration-bar-fill" style={{ width: `${barWidthPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default QueueBox;