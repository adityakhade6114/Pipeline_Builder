export const DraggableNode = ({ type, label, tone = 'default' }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.classList.add('dragging');
  };

  const onDragEnd = (event) => {
    event.currentTarget.classList.remove('dragging');
  };

  return (
    <div
      className={`palette-node palette-node--${tone}`}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
    >
      {label}
    </div>
  );
};
