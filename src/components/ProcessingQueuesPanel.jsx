// src/components/ProcessingQueuesPanel.jsx

import React from 'react';
import QueueBox from './QueueBox';

const ProcessingQueuesPanel = ({
  highPriorityQueue1, highPriorityDuration1, // HP Queue 1 props
  highPriorityQueue2, highPriorityDuration2, // NEW HP Queue 2 props
  regularQueue2, regularDuration2,
  regularQueue3, regularDuration3,
  regularQueue4, regularDuration4,
  maxBarValue
}) => {
  return (
    <div className="processing-queues-panel">
      {/* high priority 1 */}
      <QueueBox
        title="High Priority Queue 1"
        queue={highPriorityQueue1}
        duration={highPriorityDuration1}
        isHighPriority={true}
        maxBarValue={maxBarValue}
      />

      {/* high priority 2 - NEW QUEUE */}
      <QueueBox
        title="High Priority Queue 2"
        queue={highPriorityQueue2}
        duration={highPriorityDuration2}
        isHighPriority={true} // Still high priority
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