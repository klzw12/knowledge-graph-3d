/**
 * 🎨 Domain 色彩配置
 * ==================
 * 每个领域的统一颜色，所有节点和边共享。
 * 修改这里就能全局调整领域配色。
 */

export const DOMAIN_COLORS = {
  // 计算机大类
  ai:         '#ff6b6b',    // 人工智能 — 红
  ml:         '#ffaa3a',    // 机器学习 — 橙
  dl:         '#a855f7',    // 深度学习 — 紫
  rl:         '#22c55e',    // 强化学习 — 绿
  nlp:        '#06b6d4',    // 自然语言处理 — 青
  cv:         '#f97316',    // 计算机视觉 — 橘
  systems:    '#ec4899',    // 推荐系统 — 粉
  foundation: '#eab308',    // 数学基础 — 黄
  tools:      '#8b5cf6',    // 工具链 — 紫罗兰
}

/**
 * 获取节点的领域 ID
 * 从树结构中提取：root → computer → [domain] → ...
 * @param {object} node - 解析后的节点数据
 * @returns {string} domain ID
 */
export function getNodeDomain(node) {
  // _depth 0=root, 1=computer, 2=ai/foundation/tools, 3+=ml/dl/...
  if (!node || node._depth <= 1) return null
  // 从 node.id 或 _parentId 链反推 domain
  // 简单方式：用 node 的 id 匹配已知 domain
  if (DOMAIN_COLORS[node.id]) return node.id
  // 叶子节点用父 domain
  if (node._parentDomain) return node._parentDomain
  return null
}
