import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, makeHandleId } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [expr, setExpr] = useState(data?.expression || 'score > 0.5');

  return (
    <BaseNode
      id={id}
      title="Condition"
      subtitle="Branch on expression"
      accent="condition"
      handles={[
        { type: 'target', id: makeHandleId(id, 'in'), side: 'left' },
        { type: 'source', id: makeHandleId(id, 'true'), side: 'right', style: { top: '35%' } },
        { type: 'source', id: makeHandleId(id, 'false'), side: 'right', style: { top: '70%' } },
      ]}
    >
      <NodeLabel htmlFor={`${id}-expr`}>
        Expression
        <NodeInput id={`${id}-expr`} value={expr} onChange={(e) => setExpr(e.target.value)} />
      </NodeLabel>
    </BaseNode>
  );
};
