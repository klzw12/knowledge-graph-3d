/**
 * 🎯 应用领域
 *
 * AI 技术的落地应用方向
 */

import nlp from './nlp.js'
import cv from './cv.js'
import recsys from './recsys.js'

const subs = [nlp, cv, recsys]

export default {
  root: {
    id: 'app-areas',
    label: '应用领域',
    color: '#a29bfe',
    description: 'AI 技术的主要应用场景',
    content: { summary: '将算法底座的技术应用于解决实际问题的各个方向，涵盖自然语言、视觉、推荐等。', tags: ['应用'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
