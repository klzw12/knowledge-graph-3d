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
    content: { summary: '人工智能是计算机科学的核心分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
