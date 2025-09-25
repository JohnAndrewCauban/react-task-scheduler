// src/utils/scheduler.jsx

import React, { useEffect, useRef } from 'react';
import { UNITS_PER_SECOND, SCHEDULER_TICK_INTERVAL_MS } from './constants';

const Scheduler = ({
  highPriorityQueue1, setHighPriorityQueue1, setHighPriorityDuration1, // HP Queue 1 props
  highPriorityQueue2, setHighPriorityQueue2, setHighPriorityDuration2, // NEW HP Queue 2 props
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
      firstTask.duration -= UNITS_PER_SECOND;

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
        processQueue(highPriorityQueue1, setHighPriorityQueue1, setHighPriorityDuration1); // Process HP Queue 1
        processQueue(highPriorityQueue2, setHighPriorityQueue2, setHighPriorityDuration2); // Process NEW HP Queue 2
        processQueue(regularQueue2, setRegularQueue2, setRegularDuration2);
        processQueue(regularQueue3, setRegularQueue3, setRegularDuration3);
        processQueue(regularQueue4, setRegularQueue4, setRegularDuration4);
      }, SCHEDULER_TICK_INTERVAL_MS);
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isRunning,
    highPriorityQueue1, setHighPriorityQueue1, setHighPriorityDuration1, // HP Queue 1 deps
    highPriorityQueue2, setHighPriorityQueue2, setHighPriorityDuration2, // NEW HP Queue 2 deps
    regularQueue2, setRegularQueue2, setRegularDuration2,
    regularQueue3, setRegularQueue3, setRegularDuration3,
    regularQueue4, setRegularQueue4, setRegularDuration4
  ]);

  return null;
};

export default Scheduler;