// src/utils/scheduler.jsx

import React, { useEffect, useRef } from 'react';
import { UNITS_PER_SECOND, SCHEDULER_TICK_INTERVAL_MS } from './constants'; // Import constants

const Scheduler = ({
  highPriorityQueue, setHighPriorityQueue, setHighPriorityDuration,
  regularQueue2, setRegularQueue2, setRegularDuration2,
  regularQueue3, setRegularQueue3, setRegularDuration3,
  regularQueue4, setRegularQueue4, setRegularDuration4,
  isRunning
}) => {
  const intervalRef = useRef(null);

  const processQueue = (currentQueue, setQueue, setDuration) => {
    if (currentQueue.length > 0) {
      const updatedQueue = [...currentQueue];
      const firstTask = { ...updatedQueue[0] };
      firstTask.duration -= UNITS_PER_SECOND; // Use constant here

      if (firstTask.duration <= 0) {
        updatedQueue.shift();
      } else {
        updatedQueue[0] = firstTask;
      }

      setQueue(updatedQueue);
      setDuration(updatedQueue.reduce((sum, task) => sum + task.duration, 0));
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        processQueue(highPriorityQueue, setHighPriorityQueue, setHighPriorityDuration);
        processQueue(regularQueue2, setRegularQueue2, setRegularDuration2);
        processQueue(regularQueue3, setRegularQueue3, setRegularDuration3);
        processQueue(regularQueue4, setRegularQueue4, setRegularDuration4);
      }, SCHEDULER_TICK_INTERVAL_MS); // Use constant here
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isRunning,
    highPriorityQueue, setHighPriorityQueue, setHighPriorityDuration,
    regularQueue2, setRegularQueue2, setRegularDuration2,
    regularQueue3, setRegularQueue3, setRegularDuration3,
    regularQueue4, setRegularQueue4, setRegularDuration4
  ]);

  return null;
};

export default Scheduler;