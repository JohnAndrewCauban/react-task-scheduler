// src/components/TaskItem.jsx

import React from 'react';
import { UNITS_PER_SECOND } from '../utils/constants';

const TaskItem = ({ duration, isHighPriority, isProcessing, displayValue, isQueueNumberDisplay }) => {
  let itemClass = `task-item ${isHighPriority ? 'task-item-high-priority' : ''}`;
  if (isProcessing) {
    itemClass += ' task-item-processing';
  }

  // Determine what to display
  const contentToDisplay = isQueueNumberDisplay
    ? displayValue // If it's a queue number, display it directly
    : (duration / UNITS_PER_SECOND).toFixed(1) + 's'; // Otherwise, format duration as seconds

  return (
    <div className={itemClass}>{contentToDisplay}</div>
  );
};

export default TaskItem;