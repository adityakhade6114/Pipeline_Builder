import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../store';
import { BaseNode, NodeLabel, NodeTextarea, makeHandleId } from './BaseNode';

const varPattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const pullVars = (text) => {
  const found = [];
  const seen = new Set();
  let match;

  varPattern.lastIndex = 0;
  while ((match = varPattern.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }

  return found;
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [text, setText] = useState(data?.text ?? '{{input}}');
  const [size, setSize] = useState({ width: 240, height: 120 });
  const taRef = useRef(null);

  const vars = useMemo(() => pullVars(text), [text]);

  useEffect(() => {
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', vars);
  }, [id, text, vars, updateNodeField]);

  useEffect(() => {
    const el = taRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.width = 'auto';

    const nextHeight = Math.max(90, el.scrollHeight + 8);
    const nextWidth = Math.max(220, Math.min(420, el.scrollWidth + 28));

    setSize({ width: nextWidth, height: nextHeight });
  }, [text]);

  const handles = useMemo(() => {
    const targets = vars.map((name, i) => ({
      type: 'target',
      id: makeHandleId(id, name),
      side: 'left',
      style: {
        top: vars.length === 1 ? '50%' : `${((i + 1) / (vars.length + 1)) * 100}%`,
      },
    }));

    return [
      ...targets,
      {
        type: 'source',
        id: makeHandleId(id, 'output'),
        side: 'right',
      },
    ];
  }, [id, vars]);

  return (
    <BaseNode
      id={id}
      title="Text"
      subtitle="Template"
      accent="text"
      handles={handles}
      width={size.width}
      style={{ minHeight: size.height }}
    >
      <NodeLabel htmlFor={`${id}-text`}>
        Text
        <NodeTextarea
          id={`${id}-text`}
          inputRef={taRef}
          value={text}
          placeholder="Type here... use {{variable}} for inputs"
          onChange={(e) => setText(e.target.value)}
        />
      </NodeLabel>

      {vars.length ? (
        <div className="vs-node__tags">
          {vars.map((name) => (
            <span key={name} className="vs-tag">
              {name}
            </span>
          ))}
        </div>
      ) : null}
    </BaseNode>
  );
};
