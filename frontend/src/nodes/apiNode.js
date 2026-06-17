import { useState } from 'react';
import { BaseNode, NodeLabel, NodeInput, NodeSelect, makeHandleId } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API"
      subtitle="HTTP request"
      accent="api"
      handles={[
        { type: 'target', id: makeHandleId(id, 'body'), side: 'left', style: { top: '40%' } },
        { type: 'target', id: makeHandleId(id, 'headers'), side: 'left', style: { top: '70%' } },
        { type: 'source', id: makeHandleId(id, 'response'), side: 'right' },
      ]}
    >
      <NodeLabel htmlFor={`${id}-method`}>
        Method
        <NodeSelect
          id={`${id}-method`}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
          ]}
        />
      </NodeLabel>
      <NodeLabel htmlFor={`${id}-url`}>
        URL
        <NodeInput id={`${id}-url`} value={url} onChange={(e) => setUrl(e.target.value)} />
      </NodeLabel>
    </BaseNode>
  );
};
