/**
 * ⚙️ 算法底座
 *
 * ML 三大分支：传统机器学习 / 深度学习 / 强化学习
 */

import commonMl from './common-ml.js'
import dl from './dl.js'
import rl from './rl.js'

const subs = [commonMl, dl, rl]

export default {
  root: {
    id: 'algo-base',
    label: '算法底座',
    color: '#e5734a',
    description: '机器学习三大分支：传统ML、深度学习、强化学习',
    content: { summary: '机器学习的核心技术体系。传统ML精于结构化数据，DL擅长感知与非结构化数据，RL面向交互决策。三者各有侧重、相辅相成。', tags: ['核心'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
