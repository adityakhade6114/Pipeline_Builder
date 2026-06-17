import { shallow } from 'zustand/shallow';
import { useStore } from './store';

const API_URL = 'http://localhost:8000/pipelines/parse';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const onSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const payload = await res.json();
      const dagLabel = payload.is_dag ? 'Yes' : 'No';

      window.alert(
        `Pipeline results\n\n` +
          `Nodes: ${payload.num_nodes}\n` +
          `Edges: ${payload.num_edges}\n` +
          `Valid DAG: ${dagLabel}`
      );
    } catch (err) {
      window.alert(`Submit failed — is the backend running on port 8000?\n\n${err.message}`);
    }
  };

  return (
    <div className="submit-bar">
      <button type="button" className="submit-btn" onClick={onSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};
