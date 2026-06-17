import { Handle, Position } from 'reactflow';
import './baseNode.css';

const sideMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({
  id,
  title,
  subtitle,
  accent = 'default',
  handles = [],
  children,
  width,
  minWidth = 210,
  style = {},
}) => {
  const targets = handles.filter((h) => h.type === 'target');
  const sources = handles.filter((h) => h.type === 'source');

  return (
    <div
      className={`vs-node vs-node--${accent}`}
      style={{
        width: width || minWidth,
        minWidth,
        ...style,
      }}
    >
      {targets.map((handle, i) => {
        const side = handle.side || 'left';
        const count = targets.filter((h) => (h.side || 'left') === side).length;
        const idxOnSide = targets
          .slice(0, i + 1)
          .filter((h) => (h.side || 'left') === side).length;
        const offset = count === 1 ? 50 : (idxOnSide / (count + 1)) * 100;

        return (
          <Handle
            key={handle.id}
            type="target"
            position={sideMap[side]}
            id={handle.id}
            style={{
              top: side === 'left' || side === 'right' ? `${offset}%` : undefined,
              left: side === 'top' || side === 'bottom' ? `${offset}%` : undefined,
              ...handle.style,
            }}
          />
        );
      })}

      <div className="vs-node__head">
        <span className="vs-node__title">{title}</span>
        {subtitle ? <span className="vs-node__subtitle">{subtitle}</span> : null}
      </div>

      {children ? <div className="vs-node__body">{children}</div> : null}

      {sources.map((handle, i) => {
        const side = handle.side || 'right';
        const count = sources.filter((h) => (h.side || 'right') === side).length;
        const idxOnSide = sources
          .slice(0, i + 1)
          .filter((h) => (h.side || 'right') === side).length;
        const offset = count === 1 ? 50 : (idxOnSide / (count + 1)) * 100;

        return (
          <Handle
            key={handle.id}
            type="source"
            position={sideMap[side]}
            id={handle.id}
            style={{
              top: side === 'left' || side === 'right' ? `${offset}%` : undefined,
              left: side === 'top' || side === 'bottom' ? `${offset}%` : undefined,
              ...handle.style,
            }}
          />
        );
      })}
    </div>
  );
};

export const NodeLabel = ({ children, htmlFor }) => (
  <label className="vs-field" htmlFor={htmlFor}>
    {children}
  </label>
);

export const NodeInput = ({ id, value, onChange, placeholder, type = 'text' }) => (
  <input
    id={id}
    className="vs-input"
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export const NodeSelect = ({ id, value, onChange, options }) => (
  <select id={id} className="vs-select" value={value} onChange={onChange}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeTextarea = ({ id, value, onChange, placeholder, rows = 2, inputRef, onInput }) => (
  <textarea
    id={id}
    ref={inputRef}
    className="vs-textarea"
    value={value}
    rows={rows}
    placeholder={placeholder}
    onChange={onChange}
    onInput={onInput}
  />
);

export const makeHandleId = (nodeId, name) => `${nodeId}-${name}`;
