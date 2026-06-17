import { DraggableNode } from './draggableNode';

const items = [
  { type: 'customInput', label: 'Input', tone: 'input' },
  { type: 'llm', label: 'LLM', tone: 'llm' },
  { type: 'customOutput', label: 'Output', tone: 'output' },
  { type: 'text', label: 'Text', tone: 'text' },
  { type: 'filter', label: 'Filter', tone: 'filter' },
  { type: 'api', label: 'API', tone: 'api' },
  { type: 'delay', label: 'Delay', tone: 'delay' },
  { type: 'condition', label: 'Condition', tone: 'condition' },
  { type: 'merge', label: 'Merge', tone: 'merge' },
];

export const PipelineToolbar = () => {
  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo">VS</span>
        <div>
          <h1 className="toolbar__title">Pipeline Builder</h1>
          <p className="toolbar__subtitle">Drag nodes onto the canvas</p>
        </div>
      </div>

      <div className="toolbar__nodes">
        {items.map((item) => (
          <DraggableNode key={item.type} type={item.type} label={item.label} tone={item.tone} />
        ))}
      </div>
    </header>
  );
};
