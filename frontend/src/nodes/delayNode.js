import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, makeHandleId } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [seconds, setSeconds] = useState(data?.seconds || '2');

  return (
    <BaseNode
      id={id}
      title="Delay"
      subtitle="Pause execution"
      accent="delay"
      handles={[
        { type: 'target', id: makeHandleId(id, 'in'), side: 'left' },
        { type: 'source', id: makeHandleId(id, 'out'), side: 'right' },
      ]}
    >
      <NodeLabel htmlFor={`${id}-seconds`}>
        Seconds
        <NodeInput
          id={`${id}-seconds`}
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </NodeLabel>
    </BaseNode>
  );
};
