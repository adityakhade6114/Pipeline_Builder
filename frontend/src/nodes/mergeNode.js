import { useState } from 'react';
import { BaseNode, NodeLabel, NodeSelect, makeHandleId } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      subtitle="Combine streams"
      accent="merge"
      handles={[
        { type: 'target', id: makeHandleId(id, 'a'), side: 'left', style: { top: '35%' } },
        { type: 'target', id: makeHandleId(id, 'b'), side: 'left', style: { top: '70%' } },
        { type: 'source', id: makeHandleId(id, 'out'), side: 'right' },
      ]}
    >
      <NodeLabel htmlFor={`${id}-mode`}>
        Mode
        <NodeSelect
          id={`${id}-mode`}
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          options={[
            { value: 'concat', label: 'Concatenate' },
            { value: 'zip', label: 'Zip' },
            { value: 'union', label: 'Union' },
          ]}
        />
      </NodeLabel>
    </BaseNode>
  );
};
