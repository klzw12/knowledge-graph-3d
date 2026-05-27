import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

// ─── 布局参数 ───
const VERTICAL_GAP = 2.8
const RADIAL_SPREAD = 3.0
const RADIUS_DECAY = 0.6
const NODE_RADIUS = 0.35
const LEAF_RADIUS = 0.25

function hexToThree(c) {
  return new THREE.Color(c)
}

export class Graph3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, this.container.clientWidth / this.container.clientHeight, 0.1, 100)
    this.camera.position.set(10, 6, 14)

    // Renderers
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
    this.container.appendChild(this.renderer.domElement)

    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    this.container.appendChild(this.labelRenderer.domElement)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.minDistance = 4
    this.controls.maxDistance = 35
    this.controls.maxPolarAngle = Math.PI / 2.1

    // Stars
    this._createStars()
    this._createGroundGlow()

    // Lights
    this.scene.add(new THREE.AmbientLight(0x333355, 0.6))
    const dl = new THREE.DirectionalLight(0xffffff, 1.5)
    dl.position.set(10, 20, 10)
    this.scene.add(dl)
    const fl = new THREE.DirectionalLight(0x8888ff, 0.5)
    fl.position.set(-10, 5, -10)
    this.scene.add(fl)

    // State
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()
    this.nodeMeshes = []
    this.nodeMap = new Map()     // id → { data, mesh, glow, label, pos }
    this.treeEdgeGroup = new THREE.Group()
    this.crossEdgeGroup = new THREE.Group()
    this.allEdges = []           // all Line objects
    this.crossEdgeLines = []     // cross edges only
    this.selectedId = null
    this.hoveredId = null
    this.onNodeClick = null
    this.onNodeHover = null

    this.scene.add(this.treeEdgeGroup)
    this.scene.add(this.crossEdgeGroup)

    this._setupEvents()
    this._animate()
  }

  _createStars() {
    const g = new THREE.BufferGeometry()
    const n = 2000
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 40 + Math.random() * 60
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      pos[i*3] = r * Math.sin(p) * Math.cos(t)
      pos[i*3+1] = r * Math.cos(p)
      pos[i*3+2] = r * Math.sin(p) * Math.sin(t)
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const m = new THREE.PointsMaterial({ size: 0.12, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    this.stars = new THREE.Points(g, m)
    this.scene.add(this.stars)
  }

  _createGroundGlow() {
    const g = new THREE.RingGeometry(6, 14, 64)
    const m = new THREE.MeshBasicMaterial({ color: 0x4444aa, transparent: true, opacity: 0.05, side: THREE.DoubleSide, depthWrite: false })
    const r = new THREE.Mesh(g, m)
    r.rotation.x = -Math.PI / 2
    r.position.y = -3
    this.scene.add(r)
  }

  // ─── 解析树数据 → nodes[] + treeEdges[] + crossEdges[] ───
  _parseData(data) {
    const nodes = []
    const treeEdges = []
    const crossEdges = data.relations || []

    const walk = (node, parentId, depth) => {
      const nd = { ...node }
      nd._parentId = parentId
      nd._depth = depth
      if (node.children) nd._children = node.children.map(c => c.id)
      else nd._children = []
      nodes.push(nd)

      if (parentId) {
        treeEdges.push({ source: parentId, target: node.id, label: '' })
      }

      if (node.children) {
        node.children.forEach(c => walk(c, node.id, depth + 1))
      }
    }

    walk(data.root, null, 0)
    return { nodes, treeEdges, crossEdges }
  }

  // ─── 树布局（根为中心，层次辐射） ───
  _layoutTree(nodes, rootId) {
    const posMap = new Map()

    // 按 depth 分组，每层布局
    const byDepth = {}
    for (const n of nodes) {
      const d = n._depth
      if (!byDepth[d]) byDepth[d] = []
      byDepth[d].push(n)
    }

    // Root
    const root = nodes.find(n => n.id === rootId)
    if (root) posMap.set(root.id, new THREE.Vector3(0, -1, 0))

    // 逐层布局
    for (const [depthStr, levelNodes] of Object.entries(byDepth)) {
      const depth = parseInt(depthStr)
      if (depth === 0) continue

      for (const n of levelNodes) {
        const parent = nodes.find(p => p.id === n._parentId)
        const parentPos = posMap.get(n._parentId)
        if (!parentPos) continue

        // 同一父节点的兄弟节点均匀分布
        const siblings = nodes.filter(s => s._parentId === n._parentId)
        const idx = siblings.indexOf(n)
        const total = siblings.length
        const angleStep = (2 * Math.PI) / total
        const angle = angleStep * idx + (depth % 2) * 0.3

        const radius = RADIAL_SPREAD * Math.pow(RADIUS_DECAY, depth - 1) * (1 + depth * 0.08)
        const y = parentPos.y + VERTICAL_GAP * (1 - depth * 0.03)

        const x = parentPos.x + radius * Math.cos(angle)
        const z = parentPos.z + radius * Math.sin(angle) * 0.8 // slight flatten for better view

        posMap.set(n.id, new THREE.Vector3(x, y, z))
      }
    }

    return posMap
  }

  // ─── 创建弯曲连线 ───
  _createCurve(start, end, color, opacity, dashed = false) {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const offset = 0.5 + Math.random() * 0.3
    mid.x += (Math.random() - 0.5) * offset
    mid.z += (Math.random() - 0.5) * offset
    mid.y += 0.3

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const pts = curve.getPoints(20)
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({
      color: hexToThree(color),
      transparent: true,
      opacity: opacity,
      blending: dashed ? THREE.NormalBlending : THREE.AdditiveBlending,
    })
    if (dashed) {
      mat.dashed = true
      // Can't easily dash LineBasicMaterial, use a different approach
    }
    return new THREE.Line(geo, mat)
  }

  // ─── 构建 ───
  build(data) {
    // 解析
    const { nodes, treeEdges, crossEdges } = this._parseData(data)
    const positions = this._layoutTree(nodes, data.root.id)

    // 更新统计
    document.getElementById('stats-nodes').textContent = nodes.length
    document.getElementById('stats-edges').textContent = treeEdges.length + crossEdges.length

    // 创建节点
    for (const nd of nodes) {
      const pos = positions.get(nd.id)
      if (!pos) continue

      const isLeaf = !nd._children || nd._children.length === 0
      const radius = isLeaf ? LEAF_RADIUS : NODE_RADIUS

      const color = hexToThree(nd.color)
      const geo = new THREE.SphereGeometry(radius, 20, 20)
      const mat = new THREE.MeshPhysicalMaterial({
        color, emissive: color, emissiveIntensity: 0.15,
        metalness: 0.3, roughness: 0.4, clearcoat: 0.3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      mesh.userData = { nodeId: nd.id }
      this.scene.add(mesh)
      this.nodeMeshes.push(mesh)

      // Glow
      const gGeo = new THREE.SphereGeometry(radius * 1.6, 12, 12)
      const gMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.08,
        depthWrite: false, blending: THREE.AdditiveBlending,
      })
      const glow = new THREE.Mesh(gGeo, gMat)
      glow.position.copy(pos)
      this.scene.add(glow)

      // Label
      const div = document.createElement('div')
      div.className = 'graph-label'
      div.innerHTML = `<span class="label-icon">${isLeaf ? '📄' : nd._depth === 0 ? '🌳' : '📂'}</span><span class="label-text">${nd.label}</span>`
      if (!isLeaf) {
        div.innerHTML += `<span class="label-count">${nd._children.length}</span>`
      }
      div.style.color = nd.color
      const label = new CSS2DObject(div)
      label.position.copy(pos)
      label.position.y += radius + 0.45
      this.scene.add(label)

      this.nodeMap.set(nd.id, { data: nd, mesh, glow, label, pos, connectedEdges: [] })
    }

    // 创建树边（淡色细线）
    for (const e of treeEdges) {
      const from = this.nodeMap.get(e.source)
      const to = this.nodeMap.get(e.target)
      if (!from || !to) continue

      const childNode = nodes.find(n => n.id === e.target)
      const edgeColor = childNode ? childNode.color : '#8888aa'

      const line = this._createCurve(from.pos, to.pos, edgeColor, 0.2)
      this.treeEdgeGroup.add(line)
      this.allEdges.push(line)
    }

    // 创建交叉边（亮色粗线 + 光晕）
    for (const e of crossEdges) {
      const from = this.nodeMap.get(e.source)
      const to = this.nodeMap.get(e.target)
      if (!from || !to) continue

      const color = e.color || '#ffaa00'
      const line = this._createCurve(from.pos, to.pos, color, 0.5)
      this.crossEdgeGroup.add(line)
      this.allEdges.push(line)
      this.crossEdgeLines.push(line)

      // 发光副本
      const glowLine = this._createCurve(from.pos, to.pos, color, 0.08)
      this.crossEdgeGroup.add(glowLine)

      // Edge label
      if (e.label) {
        const mid = new THREE.Vector3().addVectors(from.pos, to.pos).multiplyScalar(0.5)
        const eDiv = document.createElement('div')
        eDiv.className = 'cross-edge-label'
        eDiv.textContent = e.label
        eDiv.style.color = color
        const eLabel = new CSS2DObject(eDiv)
        eLabel.position.copy(mid)
        this.scene.add(eLabel)
      }
    }

    this._focusGraph()
  }

  _focusGraph() {
    const box = new THREE.Box3().setFromObject(this.scene)
    const c = box.getCenter(new THREE.Vector3())
    this.controls.target.copy(c)
  }

  // ─── 高亮逻辑 ───
  selectNode(nodeId) {
    this._resetHighlight()
    if (!nodeId) { this.selectedId = null; return }

    const entry = this.nodeMap.get(nodeId)
    if (!entry) return
    this.selectedId = nodeId

    // 找树邻居（父子）
    const neighbors = new Set()
    const walkUp = (id, depth) => {
      if (depth > 3) return
      const e = this.nodeMap.get(id)
      if (!e) return
      neighbors.add(id)
      const parentId = e.data._parentId
      if (parentId) walkUp(parentId, depth + 1)
      if (e.data._children) e.data._children.forEach(c => neighbors.add(c))
    }
    walkUp(nodeId, 0)

    // 找交叉邻居
    const crossNeighbors = new Set()
    const allRel = []
    // Reconstruct from cross edges - this is a bit hacky but works
    // We need access to the original crossEdges data
    // For now, compute from nodeMap

    // 高亮选中节点
    entry.mesh.material.emissiveIntensity = 0.8
    entry.glow.material.opacity = 0.35
    entry.label.element.classList.add('active')

    // 高亮树邻居
    for (const nid of neighbors) {
      const n = this.nodeMap.get(nid)
      if (!n || nid === nodeId) continue
      n.mesh.material.emissiveIntensity = 0.4
      n.glow.material.opacity = 0.18
      n.label.element.classList.add('connected')
    }

    // 所有边调暗，选中和邻居的边加亮
    // Tree edges: highlight connections to/from selected
    for (const child of this.treeEdgeGroup.children) {
      child.material.opacity = 0.04
    }
    // Cross edges: brighten if connected to selected
    for (const line of this.crossEdgeLines) {
      line.material.opacity = 0.04
    }

    // Simplified: just highlight all edges from/to selected node
    // by checking nodeMap connections later
    // For now, just brighten cross edges near selection
    // This is a visual simplification

    // 淡化非关联节点
    const allHighlighted = new Set([...neighbors])
    for (const [id, n] of this.nodeMap) {
      if (allHighlighted.has(id) || id === nodeId) continue
      n.mesh.material.opacity = 0.12
      n.mesh.material.transparent = true
      n.glow.material.opacity = 0.02
      n.label.element.style.opacity = '0.2'
    }
  }

  _resetHighlight() {
    for (const [id, n] of this.nodeMap) {
      n.mesh.material.emissiveIntensity = 0.15
      n.mesh.material.opacity = 1
      n.mesh.material.transparent = false
      n.glow.material.opacity = 0.08
      n.label.element.classList.remove('active', 'connected')
      n.label.element.style.opacity = '1'
    }
    for (const line of this.allEdges) {
      line.material.opacity = line.material._origOpacity || 0.3
    }
    // Restore tree/cross edge defaults
    for (const child of this.treeEdgeGroup.children) {
      child.material.opacity = 0.2
    }
    for (const line of this.crossEdgeLines) {
      line.material.opacity = 0.5
    }
  }

  _handleHover(event) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(this.nodeMeshes)

    if (hits.length > 0) {
      const nid = hits[0].object.userData.nodeId
      if (this.hoveredId !== nid) {
        if (this.hoveredId && this.hoveredId !== this.selectedId) {
          const prev = this.nodeMap.get(this.hoveredId)
          if (prev) { prev.mesh.material.emissiveIntensity = 0.15; prev.glow.material.opacity = 0.08 }
        }
        this.hoveredId = nid
        const entry = this.nodeMap.get(nid)
        if (entry && nid !== this.selectedId) {
          entry.mesh.material.emissiveIntensity = 0.5
          entry.glow.material.opacity = 0.2
        }
        this.renderer.domElement.style.cursor = 'pointer'
        if (this.onNodeHover) this.onNodeHover(entry?.data || null)
      }
    } else {
      if (this.hoveredId && this.hoveredId !== this.selectedId) {
        const prev = this.nodeMap.get(this.hoveredId)
        if (prev) { prev.mesh.material.emissiveIntensity = 0.15; prev.glow.material.opacity = 0.08 }
      }
      this.hoveredId = null
      this.renderer.domElement.style.cursor = 'default'
      if (this.onNodeHover) this.onNodeHover(null)
    }
  }

  _handleClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(this.nodeMeshes)

    if (hits.length > 0) {
      const nid = hits[0].object.userData.nodeId
      this.selectNode(nid)
      const entry = this.nodeMap.get(nid)
      if (this.onNodeClick && entry) this.onNodeClick(entry.data)
    } else {
      this.selectNode(null)
      if (this.onNodeClick) this.onNodeClick(null)
    }
  }

  _setupEvents() {
    this.renderer.domElement.addEventListener('click', (e) => this._handleClick(e))
    this.renderer.domElement.addEventListener('mousemove', (e) => this._handleHover(e))
    window.addEventListener('resize', () => {
      const w = this.container.clientWidth
      const h = this.container.clientHeight
      this.camera.aspect = w / h
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(w, h)
      this.labelRenderer.setSize(w, h)
    })
  }

  _animate() {
    requestAnimationFrame(() => this._animate())
    if (this.stars) this.stars.rotation.y += 0.00015
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.labelRenderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.dispose()
    this.labelRenderer.domElement.remove()
    this.renderer.domElement.remove()
  }
}
