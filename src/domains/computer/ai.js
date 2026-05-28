/**
 * 🤖 人工智能 (AI)
 * 
 * 合并 AI 子领域（ml, dl, rl, nlp, cv, systems）
 * 由 computer.js 导入
 */

import ml from './ai/ml.js'
import dl from './ai/dl.js'
import rl from './ai/rl.js'
import nlp from './ai/nlp.js'
import cv from './ai/cv.js'
import systems from './ai/systems.js'

const subDomains = [ ml, dl, rl, nlp, cv, systems ]

export default {
  root: {
    id: 'ai',
    label: '人工智能',
    color: '#ff6b6b',
    description: '让机器模拟人类智能的学科',
    content: { summary: '人工智能是计算机科学的核心分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] },
    children: subDomains.map(d => d.root),
  },
  relations: subDomains.flatMap(d => d.relations || []),
}
