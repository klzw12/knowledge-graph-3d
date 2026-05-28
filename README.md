# Knowledge Graph 3D 🕸️

交互式 3D 知识图谱，用 Three.js 可视化知识体系。

[在线演示](https://klzw12.github.io/knowledge-graph-3d/) · [GitHub 仓库](https://github.com/klzw12/knowledge-graph-3d)

## 特性

- ⚡ **InstancedMesh 批量渲染** — 所有节点一次 draw call，性能丝滑
- 🧭 **d3-force-3d 力导向布局** — 节点自动排布，关联的靠拢，无关的远离
- 🎥 **球坐标相机** — 拖拽旋转、滚轮缩放、点击 flyTo、空闲自动旋转
- 🔍 **搜索** — 实时过滤高亮，按名称/描述/ID 匹配
- 🌸 **UnrealBloomPass** — 全局泛光，节点自带发光效果
- 📱 **触屏支持** — 单指旋转、双指缩放
- 🏗️ **层级数据** — 按大类/子域组织，新增领域只需加一个文件

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

产物在 `dist/` 目录，可直接部署到任何静态托管（GitHub Pages、Vercel、nginx 等）。

## 交互

| 操作 | 效果 |
|------|------|
| 🖱 拖拽 | 旋转视角 |
| 🖱 滚轮 | 缩放远近 |
| 🖱 点击节点 | flyTo 飞近 + 显示详情面板 |
| 🖱 双击节点 | 打开节点链接（如有） |
| 🖱 右键 | 复位到全景 |
| ⌨ ESC | 取消选中 + 清搜索 + 复位全景 |
| 🔄 不动它 | 自动旋转 |

## 数据结构

数据文件按层级组织在 `src/domains/` 下：

```
domains/
├── index.js              ← 入口，挂载所有大类
├── computer.js           ← "计算机科学"大类，合并子域
└── computer/
    ├── ai.js             ← "人工智能"子域，合并子领域
    ├── ai/
    │   ├── ml.js         ← 机器学习（叶子节点）
    │   ├── dl.js         ← 深度学习
    │   ├── rl.js         ← 强化学习
    │   ├── nlp.js        ← 自然语言处理
    │   ├── cv.js         ← 计算机视觉
    │   └── systems.js    ← 推荐系统 & 知识图谱
    ├── foundation.js     ← 数学基础（叶子节点）
    └── tools.js          ← 工具链（叶子节点）
```

### 叶子节点文件格式

每个叶子文件（如 `ml.js`）导出一个对象：

```js
export default {
  root: {
    id: 'ml',
    label: '机器学习',
    color: '#ffaa3a',
    description: '从数据中学习模式',
    content: { summary: '让计算机通过数据自动学习规律…', tags: ['核心领域'] },
    children: [
      {
        id: 'supervised',
        label: '监督学习',
        color: '#ff9933',
        children: [
          { id: 'linear-reg', label: '线性回归', color: '#ff8866' },
          { id: 'svm', label: 'SVM', color: '#ff7755' },
        ],
      },
    ],
  },
  // 交叉关联（可跨域引用）
  relations: [
    { source: 'linear-reg', target: 'dl', label: '基础方法', color: '#ffaa00' },
  ],
}
```

### 新增知识领域

三步搞定：

1. **写叶子文件** — 在对应子域目录下新建 `.js` 文件，按上方格式导出
2. **挂到父级** — 在对应的大类/子域聚合文件中 `import` 并加入 `children` 数组
3. **刷新页面** — 完成

例：在 AI 下新增"知识图谱"子领域 → 在 `computer/ai/` 下建 `kg.js`，在 `computer/ai.js` 里 import 加入数组。

### 新增大类

在 `domains/` 下建一个文件夹 + 一个合并文件，结构参考 `computer/` 和 `computer.js`，然后在 `domains/index.js` 里 import 加入 `categories` 数组。

## 技术栈

| 技术 | 用途 |
|------|------|
| [Three.js](https://threejs.org/) | 3D 渲染引擎 |
| [d3-force-3d](https://github.com/vasturiano/d3-force-3d) | 力导向布局 |
| [Vite](https://vitejs.dev/) | 构建工具 |

## 参考

- [MeetBlog · 中文博客星系](https://meet-blog.buyixiao.xyz/) — 本项目的灵感来源
- [vasturiano/3d-force-graph](https://github.com/vasturiano/3d-force-graph) — Three.js 力导向图参考实现
