import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, NodeSelect, makeHandleId } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      subtitle="Start of pipeline"
      accent="input"
      handles={[{ type: 'source', id: makeHandleId(id, 'value'), side: 'right' }]}
    >
      <NodeLabel htmlFor={`${id}-name`}>
        Name
        <NodeInput id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} />
      </NodeLabel>
      <NodeLabel htmlFor={`${id}-type`}>
        Type
        <NodeSelect
          id={`${id}-type`}
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </NodeLabel>
    </BaseNode>
  );
};
