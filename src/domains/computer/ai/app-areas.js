/**
 * 🎯 应用领域
 *
 * AI 技术的落地应用方向
 */

import nlp from './app-areas/nlp.js'
import cv from './app-areas/cv.js'
import recsys from './app-areas/recsys.js'

const subs = [nlp, cv, recsys]

export default {
  root: {
    id: 'app-areas',
    label: '应用领域',
    color: '#a29bfe',
    description: '将算法之力落于现实场景的桥梁',
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
