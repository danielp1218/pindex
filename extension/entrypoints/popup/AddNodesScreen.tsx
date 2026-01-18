import type { RelationGraphNode } from '@/types/relationGraph';
import { addChildNode, flattenGraph } from '@/utils/relationGraph';

interface AddNodesScreenProps {
  relationGraph: RelationGraphNode;
  onGraphUpdate: (newGraph: RelationGraphNode) => void;
  marketImageUrl: string | null;
}

function AddNodesScreen({ relationGraph, onGraphUpdate, marketImageUrl }: AddNodesScreenProps) {
  const generateRandomLabel = () => {
    const adjectives = ['Quick', 'Lazy', 'Happy', 'Sad', 'Brave', 'Smart', 'Wild', 'Calm', 'Bold', 'Swift'];
    const nouns = ['Fox', 'Dog', 'Cat', 'Bear', 'Wolf', 'Eagle', 'Tiger', 'Lion', 'Hawk', 'Owl'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
  };

  const addRandomNode = () => {
    const allNodes = flattenGraph(relationGraph);
    const parent = allNodes[Math.floor(Math.random() * allNodes.length)] ?? relationGraph;
    const newNode: RelationGraphNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: generateRandomLabel(),
      imageUrl: marketImageUrl || undefined,
      probability: 0.5,
      weight: 1,
      decision: 'yes',
      relation: 'WEAK_SIGNAL',
      children: [],
    };

    const nextGraph = addChildNode(relationGraph, parent.id, newNode);
    onGraphUpdate(nextGraph);
  };

  const allNodes = flattenGraph(relationGraph);
  const linkCount = allNodes.reduce((sum, node) => sum + (node.children?.length ?? 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p>Total nodes: {allNodes.length}</p>
        <p>Total links: {linkCount}</p>
      </div>
      
      <button 
        onClick={addRandomNode}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Add Random Node
      </button>

      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
        <h3>Nodes:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {allNodes.map((node) => (
            <li key={node.id} style={{ padding: '5px 0' }}>
              {node.label} <span style={{ color: '#666', fontSize: '12px' }}>({node.id})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddNodesScreen;
