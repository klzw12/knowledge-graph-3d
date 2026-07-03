/**
 * 🌐 自然语言
 * 
 * 人类自然语言的学习与认知体系。
 * 与计算机下的「语言与框架」（编程语言）区分。
 * 未来可与 AI 下的 NLP 领域建立跨域连接。
 */

export default {
  root: {
    id: 'natural-languages',
    label: '自然语言',
    color: '#14b8a6',
    description: '人类自然语言的学习体系',
    src: '/pages/languages.html',
    content: { summary: '人类语言的音韵、语法与认知体系。自然语言处理（NLP）的现实基础。', tags: ['语言学', '自然语言', '外语学习'] },
    children: [
      {
        id: 'japanese',
        label: '日语',
        color: '#ec4899',
        description: '日本語の学習体系',
        src: '/pages/languages/japanese.html',
        content: { summary: '日语（日本語）学习知识体系。五十音、音韵体系、助词与动词活用等通用语法。', tags: ['日语', '日本語', '五十音', '音韵', '语法'] },
        children: [
          {
            id: 'jp-phonology',
            label: '音韵体系',
            color: '#f43f5e',
            src: '/pages/languages/japanese.html#phonology',
            content: { summary: '日语发音体系。五十音图（清音）、浊音·半浊音·鼻浊音、长音·促音·拗音、声调アクセント。五十音单音均为清音，干脆利落；长音本质是音拍延长而非拉长，中文母语者天然有音长感知。', tags: ['五十音', '清音', '浊音', '长音', '促音', '拗音', 'アクセント', '音拍'] },
          },
          {
            id: 'jp-grammar',
            label: '通用语法',
            color: '#8b5cf6',
            src: '/pages/languages/japanese.html#grammar',
            content: { summary: '日语通用语法体系。助词（は/が/を/に/で/へ/と/から/まで…）、动词活用（ます形/て形/た形/ない形/辞書形/意向形…）、形容词活用、敬语（丁寧語/尊敬語/謙譲語）、文体与句末表达。です（断定助动词「だ」的礼貌体）变化：現在です/でした、否定では（じゃ）ありません/ありませんでした、疑問+か。口语中か可省略靠语调表疑问。中文母语者可把です理解成"句末语气词槽位"但与感叹词不同——删了句子语法不完整。', tags: ['语法', '助词', '动词活用', '敬语', '文体', 'です', 'か', '断定'] },
          },
        ],
      },
    ],
  },
  relations: [
    // 音韵与语法内部关联
    { source: 'jp-phonology', target: 'jp-grammar', label: '音韵是语法的基础载体', color: '#14b8a6' },
    // 跨域：与 NLP 的连接（预留）
    // { source: 'jp-grammar', target: 'nlp', label: '自然语法→NLP 理论基础', color: '#14b8a6' },
  ],
}
