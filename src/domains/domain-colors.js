/**
 * 🎨 Domain 色彩配置
 * ==================
 * 每个领域的统一颜色，所有节点和边共享。
 * 修改这里就能全局调整领域配色。
 * 
 * key = 节点的 id（或 _parentDomain）
 * value = 颜色值
 */

export const DOMAIN_COLORS = {
  // 人工智能
  ai:      '#ff6b6b',    // 人工智能 — 红
  ml:      '#ffaa3a',    // 机器学习 — 橙
  dl:      '#a855f7',    // 深度学习 — 紫
  rl:      '#22c55e',    // 强化学习 — 绿
  nlp:     '#06b6d4',    // 自然语言处理 — 青
  cv:      '#f97316',    // 计算机视觉 — 橘
  systems: '#ec4899',    // 推荐系统 & 知识图谱 — 粉

  // 数学基础
  math:    '#eab308',    // 数学基础 — 黄

  // 语言与框架
  languages: '#8b5cf6', // 语言与框架 — 紫罗兰
}

/**
 * 获取节点的领域 ID
 */
export function getNodeDomain(node) {
  if (!node || node._depth <= 1) return null
  if (DOMAIN_COLORS[node.id]) return node.id
  if (node._parentDomain) return node._parentDomain
  return null
}
