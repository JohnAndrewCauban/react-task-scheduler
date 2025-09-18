// src/components/ProcessingQueuesPanel.jsx

import React from 'react'; // React
import QueueBox from './QueueBox'; // import QueueBox

// component: displays all processing queues
const ProcessingQueuesPanel = ({
  highPriorityQueue, highPriorityDuration,
  regularQueue2, regularDuration2,
  regularQueue3, regularDuration3,
  regularQueue4, regularDuration4,
  maxBarValue
}) => {
  return (
    <div className="processing-queues-panel">
      {/* high priority */}
      <QueueBox
        title="High Priority Queue 1"
        queue={highPriorityQueue}
        duration={highPriorityDuration}
        isHighPriority={true}
        maxBarValue={maxBarValue}
      />

      {/* regular 2 */}
      <QueueBox
        title="Regular Queue 2"
        queue={regularQueue2}
        duration={regularDuration2}
        isHighPriority={false}
        maxBarValue={maxBarValue}
      />

      {/* regular 3 */}
      <QueueBox
        title="Regular Queue 3"
        queue={regularQueue3}
        duration={regularDuration3}
        isHighPriority={false}
        maxBarValue={maxBarValue}
      />

      {/* regular 4 */}
      <QueueBox
        title="Regular Queue 4"
        queue={regularQueue4}
        duration={regularDuration4}
        isHighPriority={false}
        maxBarValue={maxBarValue}
      />
    </div>
  );
};

export default ProcessingQueuesPanel;