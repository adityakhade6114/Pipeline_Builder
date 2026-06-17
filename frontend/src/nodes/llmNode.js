import { BaseNode, makeHandleId } from './BaseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      subtitle="Language model step"
      accent="llm"
      handles={[
        { type: 'target', id: makeHandleId(id, 'system'), side: 'left', style: { top: '35%' } },
        { type: 'target', id: makeHandleId(id, 'prompt'), side: 'left', style: { top: '65%' } },
        { type: 'source', id: makeHandleId(id, 'response'), side: 'right' },
      ]}
    >
      <p className="vs-node__hint">Runs a model on connected prompt + system inputs.</p>
    </BaseNode>
  );
};
