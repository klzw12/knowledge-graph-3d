/**
 * ⚙️ 算法底座
 *
 * ML 三大分支：传统机器学习 / 深度学习 / 强化学习
 */

import commonMl from './algo-base/common-ml.js'
import dl from './algo-base/dl.js'
import rl from './algo-base/rl.js'

const subs = [commonMl, dl, rl]

export default {
  root: {
    id: 'algo-base',
    label: '算法底座',
    color: '#e5734a',
    description: '让机器从数据中涌现智能的方法论总称',
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
