// App.js

import React, { useState, useRef, useEffect } from 'react'; // state, ref, effect
import './App.css';
import Scheduler from './utils/scheduler'; // import
import TaskQueuePanel from './components/TaskQueuePanel'; // import TaskQueuePanel
import ProcessingQueuesPanel from './components/ProcessingQueuesPanel'; // import ProcessingQueuesPanel
import ThemeToggleButton from './components/ThemeToggleButton'; // import theme toggle
import { HIGH_PRIORITY_THRESHOLD, MAX_BAR_DISPLAY_VALUE, UNITS_PER_SECOND } from './utils/constants'; // Import constants

function App() {
  // task id counter
  const nextTaskId = useRef(0);
  const nextQueueNumber = useRef(100);

  // main queue
  const [tasks, setTasks] = useState([]);

  // processing queues
  const [highPriorityQueue, setHighPriorityQueue] = useState([]);
  const [regularQueue2, setRegularQueue2] = useState([]);
  const [regularQueue3, setRegularQueue3] = useState([]);
  const [regularQueue4, setRegularQueue4] = useState([]);

  // durations
  const [highPriorityDuration, setHighPriorityDuration] = useState(0);
  const [regularDuration2, setRegularDuration2] = useState(0);
  const [regularDuration3, setRegularDuration3] = useState(0);
  const [regularDuration4, setRegularDuration4] = useState(0);

  // scheduler control
  const [isRunning, setIsRunning] = useState(false);

  // theme control
  const [darkMode, setDarkMode] = useState(true); // Start with dark mode

  // effect
  useEffect(() => {
    // toggle: body class
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]); // watch theme state

  // add
  const addTask = () => {
    const randomDuration = Math.floor(Math.random() * 200) + 1;
    const newTask = {
      id: nextTaskId.current++,
      duration: randomDuration,
      queueNumber: nextQueueNumber.current++
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // admit
  const admitTask = () => {
    if (tasks.length === 0) {
      return;
    }

    const nextTask = tasks[0];
    setTasks(prevTasks => prevTasks.slice(1));

    if (nextTask.duration <= HIGH_PRIORITY_THRESHOLD) {
      setHighPriorityQueue(prevQueue => [...prevQueue, nextTask]);
      setHighPriorityDuration(prevDuration => prevDuration + nextTask.duration);
    } else {
      const regularQueues = [
        { id: 2, queue: regularQueue2, setQueue: setRegularQueue2, duration: regularDuration2, setDuration: setRegularDuration2 },
        { id: 3, queue: regularQueue3, setQueue: setRegularQueue3, duration: regularDuration3, setDuration: setRegularDuration3 },
        { id: 4, queue: regularQueue4, setQueue: setRegularQueue4, duration: regularDuration4, setDuration: setRegularDuration4 },
      ];

      let shortestQueue = regularQueues[0];
      for (let i = 1; i < regularQueues.length; i++) {
        if (regularQueues[i].duration < shortestQueue.duration) {
          shortestQueue = regularQueues[i];
        }
      }

      shortestQueue.setQueue(prevQueue => [...prevQueue, nextTask]);
      shortestQueue.setDuration(prevDuration => prevDuration + nextTask.duration);
    }
  };

  // toggle
  const toggleScheduler = () => {
    setIsRunning(prev => !prev);
  };

  // reset
  const resetAllQueues = () => {
    setTasks([]);
    setHighPriorityQueue([]);
    setRegularQueue2([]);
    setRegularQueue3([]);
    setRegularQueue4([]);
    setHighPriorityDuration(0);
    setRegularDuration2(0);
    setRegularDuration3(0);
    setRegularDuration4(0);
    setIsRunning(false);
    nextTaskId.current = 0;
    nextQueueNumber.current = 100;
  };

  // toggle: theme
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };


  return (
    <div className="App">
      <main className="main-container">
        {/* left */}
        <TaskQueuePanel
          tasks={tasks}
          addTask={addTask}
          admitTask={admitTask}
          highPriorityThreshold={HIGH_PRIORITY_THRESHOLD}
        />

        {/* right */}
        <ProcessingQueuesPanel
          highPriorityQueue={highPriorityQueue}
          highPriorityDuration={highPriorityDuration}
          regularQueue2={regularQueue2}
          regularDuration2={regularDuration2}
          regularQueue3={regularQueue3}
          regularDuration3={regularDuration3}
          regularQueue4={regularQueue4}
          regularDuration4={regularDuration4}
          maxBarValue={MAX_BAR_DISPLAY_VALUE}
        />
      </main>
      {/* control buttons container */}
      <div className="control-buttons-container">
        <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* Theme toggle button */}
        <button
          className={`scheduler-control-btn ${isRunning ? '' : 'is-paused'}`}
          onClick={toggleScheduler}
        >
          {isRunning ? 'PAUSE SCHEDULER' : 'START SCHEDULER'}
        </button>
        <button className="reset-btn" onClick={resetAllQueues}>RESET ALL</button>
      </div>


      {/* scheduler component */}
      <Scheduler
        highPriorityQueue={highPriorityQueue} setHighPriorityQueue={setHighPriorityQueue} setHighPriorityDuration={setHighPriorityDuration}
        regularQueue2={regularQueue2} setRegularQueue2={setRegularQueue2} setRegularDuration2={setRegularDuration2}
        regularQueue3={regularQueue3} setRegularQueue3={setRegularQueue3} setRegularDuration3={setRegularDuration3}
        regularQueue4={regularQueue4} setRegularQueue4={setRegularQueue4} setRegularDuration4={setRegularDuration4}
        isRunning={isRunning}
      />
    </div>
  );
}

export default App;