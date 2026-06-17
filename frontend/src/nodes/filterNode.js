import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, makeHandleId } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [rule, setRule] = useState(data?.rule || 'contains');

  return (
    <BaseNode
      id={id}
      title="Filter"
      subtitle="Drop unwanted rows"
      accent="filter"
      handles={[
        { type: 'target', id: makeHandleId(id, 'in'), side: 'left' },
        { type: 'source', id: makeHandleId(id, 'out'), side: 'right' },
      ]}
    >
      <NodeLabel htmlFor={`${id}-rule`}>
        Rule
        <NodeInput
          id={`${id}-rule`}
          value={rule}
          placeholder="e.g. status == active"
          onChange={(e) => setRule(e.target.value)}
        />
      </NodeLabel>
    </BaseNode>
  );
};
