/**
 * 🤖 人工智能 (AI)
 *
 * 分支：算法底座 + 应用领域
 */

import algoBase from './ai/algo-base.js'
import appAreas from './ai/app-areas.js'

const subs = [algoBase, appAreas]

export default {
  root: {
    id: 'ai',
    label: '人工智能',
    color: '#ff6b6b',
    description: '让机器模拟人类智能的学科',
    src: '/pages/computer/ai.html',
    content: { summary: '赋予机器感知、推理与决策能力的学科，计算机科学最具变革性的分支。', tags: ['核心'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
