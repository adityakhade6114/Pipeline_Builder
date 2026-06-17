import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, NodeSelect, makeHandleId } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      subtitle="End of pipeline"
      accent="output"
      handles={[{ type: 'target', id: makeHandleId(id, 'value'), side: 'left' }]}
    >
      <NodeLabel htmlFor={`${id}-name`}>
        Name
        <NodeInput id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} />
      </NodeLabel>
      <NodeLabel htmlFor={`${id}-type`}>
        Type
        <NodeSelect
          id={`${id}-type`}
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' },
          ]}
        />
      </NodeLabel>
    </BaseNode>
  );
};
