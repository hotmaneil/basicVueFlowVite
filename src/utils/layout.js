/**
 * 從useLayout改為另一版本：dagre 自動排版TB（上下）整合進「可折疊群組」版本
 * 目前還是不行
 */
import * as dagre from '@dagrejs/dagre';

/**
 * 以直向重跑排版
 * @param {*} nodes
 * @param {*} edges
 * @returns
 */
export function runLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: 'TB', // Top -> Bottom
    nodesep: 50,
    ranksep: 80,
  });
  g.setDefaultEdgeLabel(() => ({}));

  // 設定節點大小（可依你 UI 調整）
  nodes.forEach((node) => {
    if (!node.hidden) {
      g.setNode(node.id, {
        width: node.style?.width ? parseInt(node.style.width) : 180,
        height: node.style?.height ? parseInt(node.style.height) : 40,
      });
    }
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const newPositions = {};
  g.nodes().forEach((id) => {
    const pos = g.node(id);
    newPositions[id] = { x: pos.x, y: pos.y };
  });

  return newPositions;
}
