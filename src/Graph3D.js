import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'

// ─── 力导向布局参数 ───
const REPULSION = 80
const ATTRACTION = 0.003
const CENTER_GRAVITY = 0.02
const DAMPING = 0.85
const MIN_DIST = 0.5
const MAX_ITER = 120
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
    this.camera.position.set(12, 8, 16)

    // WebGL
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
    this.container.appendChild(this.renderer.domElement)

    // CSS2D
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
    this.controls.maxDistance = 40

    // Stars
    this._createStars()

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
    this.nodeMeshes = []      // for raycaster
    this.nodes = new Map()    // id → { mesh, label, data, edges }
    this.edgeLines = []       // all edge Line objects
    this.edgeMap = new Map()  // "src→dst" → line objects
    this.selectedId = null
    this.hoveredId = null
    this.onNodeClick = null
    this.onNodeHover = null

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

  // ─── 力导向布局 ───
  _forceLayout(nodes, edges) {
    const pos = new Map()  // id → Vector3
    const vel = new Map()  // id → Vector3

    // 随机初始化
    for (const n of nodes) {
      pos.set(n.id, new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 8
      ))
      vel.set(n.id, new THREE.Vector3())
    }

    for (let iter = 0; iter < MAX_ITER; iter++) {
      const cooling = 1 - iter / MAX_ITER

      // 1. 斥力（所有节点对）
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i].id, b = nodes[j].id
          const pa = pos.get(a), pb = pos.get(b)
          const dx = pb.x - pa.x, dy = pb.y - pa.y, dz = pb.z - pa.z
          let dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
          if (dist < MIN_DIST) dist = MIN_DIST
          const force = (REPULSION / (dist * dist)) * cooling
          const fx = (dx / dist) * force
          const fy = (dy / dist) * force
          const fz = (dz / dist) * force
          vel.get(a).x -= fx; vel.get(a).y -= fy; vel.get(a).z -= fz
          vel.get(b).x += fx; vel.get(b).y += fy; vel.get(b).z += fz
        }
      }

      // 2. 引力（沿边）
      for (const e of edges) {
        const pa = pos.get(e.source), pb = pos.get(e.target)
        if (!pa || !pb) continue
        const dx = pb.x - pa.x, dy = pb.y - pa.y, dz = pb.z - pa.z
        let dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
        if (dist < MIN_DIST) dist = MIN_DIST
        const force = ATTRACTION * dist * cooling
        const fx = (dx / dist) * force
        const fy = (dy / dist) * force
        const fz = (dz / dist) * force
        vel.get(e.source).x += fx; vel.get(e.source).y += fy; vel.get(e.source).z += fz
        vel.get(e.target).x -= fx; vel.get(e.target).y -= fy; vel.get(e.target).z -= fz
      }

      // 3. 中心引力
      for (const n of nodes) {
        const p = pos.get(n.id)
        const dist = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z)
        if (dist > 0.1) {
          vel.get(n.id).x -= (p.x / dist) * CENTER_GRAVITY * cooling
          vel.get(n.id).y -= (p.y / dist) * CENTER_GRAVITY * cooling
          vel.get(n.id).z -= (p.z / dist) * CENTER_GRAVITY * cooling
        }
      }

      // 4. 阻尼 + 更新位置
      for (const n of nodes) {
        const v = vel.get(n.id)
        v.multiplyScalar(DAMPING)
        const p = pos.get(n.id)
        p.add(v)
      }
    }

    return pos
  }

  // ─── 构建图谱 ───
  build(data) {
    const { nodes, edges } = data
    const positions = this._forceLayout(nodes, edges)

    // 更新统计
    document.getElementById('stats-nodes').textContent = nodes.length
    document.getElementById('stats-edges').textContent = edges.length

    // 创建节点
    for (const nd of nodes) {
      const pos = positions.get(nd.id)
      if (!pos) continue

      const isLeaf = !nd.children || nd.children.length === 0
      const radius = isLeaf ? LEAF_RADIUS : NODE_RADIUS

      // Mesh
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
      div.innerHTML = `<span class="label-text">${nd.label}</span>`
      div.style.color = nd.color
      const label = new CSS2DObject(div)
      label.position.copy(pos)
      label.position.y += radius + 0.45
      this.scene.add(label)

      this.nodes.set(nd.id, { data: nd, mesh, glow, label, pos, edges: [] })
    }

    // 创建边
    for (const e of edges) {
      const from = this.nodes.get(e.source)
      const to = this.nodes.get(e.target)
      if (!from || !to) continue

      const start = from.pos
      const end = to.pos
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      mid.y += 0.5

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      const pts = curve.getPoints(20)
      const color = hexToThree(e.color)
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const lMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending })
      const line = new THREE.Line(lGeo, lMat)
      this.scene.add(line)
      this.edgeLines.push(line)

      // Edge label (middle)
      if (e.label) {
        const eDiv = document.createElement('div')
        eDiv.className = 'edge-label'
        eDiv.textContent = e.label
        const eLabel = new CSS2DObject(eDiv)
        eLabel.position.copy(mid)
        eLabel.position.y += 0.3
        this.scene.add(eLabel)
      }

      // Index edges per node
      from.edges.push(line)
      to.edges.push(line)
      const key = [e.source, e.target].sort().join('→')
      if (!this.edgeMap.has(key)) this.edgeMap.set(key, [])
      this.edgeMap.get(key).push({ line, label: e.label, source: e.source, target: e.target })
    }

    this._focusGraph()
  }

  _focusGraph() {
    const box = new THREE.Box3().setFromObject(this.scene)
    const c = box.getCenter(new THREE.Vector3())
    this.controls.target.copy(c)
  }

  // ─── 选中高亮（1-hop 邻居） ───
  selectNode(nodeId) {
    // 还原
    this._resetHighlight()

    if (!nodeId) { this.selectedId = null; return }

    const entry = this.nodes.get(nodeId)
    if (!entry) return
    this.selectedId = nodeId

    // 找邻居
    const neighbors = new Set()
    const neighborEdges = new Set()
    for (const [key, lines] of this.edgeMap) {
      for (const l of lines) {
        if (l.source === nodeId) { neighbors.add(l.target); neighborEdges.add(key) }
        if (l.target === nodeId) { neighbors.add(l.source); neighborEdges.add(key) }
      }
    }

    // 高亮选中节点
    entry.mesh.material.emissiveIntensity = 0.8
    entry.glow.material.opacity = 0.35
    entry.label.element.classList.add('active')

    // 高亮邻居
    for (const nid of neighbors) {
      const n = this.nodes.get(nid)
      if (!n) continue
      n.mesh.material.emissiveIntensity = 0.5
      n.glow.material.opacity = 0.2
      n.label.element.classList.add('connected')
    }

    // 高亮边
    for (const [key, lines] of this.edgeMap) {
      const isHighlighted = neighborEdges.has(key)
      for (const l of lines) {
        l.line.material.opacity = isHighlighted ? 0.7 : 0.05
      }
    }

    // 淡化非邻居
    for (const [id, n] of this.nodes) {
      if (id === nodeId || neighbors.has(id)) continue
      n.mesh.material.opacity = 0.15
      n.mesh.material.transparent = true
      n.glow.material.opacity = 0.02
      n.label.element.style.opacity = '0.2'
    }
  }

  _resetHighlight() {
    for (const [id, n] of this.nodes) {
      n.mesh.material.emissiveIntensity = 0.15
      n.mesh.material.opacity = 1
      n.mesh.material.transparent = false
      n.glow.material.opacity = 0.08
      n.label.element.classList.remove('active', 'connected')
      n.label.element.style.opacity = '1'
    }
    for (const l of this.edgeLines) {
      l.material.opacity = 0.3
    }
  }

  // ─── 悬停 ───
  _handleHover(event) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObjects(this.nodeMeshes)

    if (hits.length > 0) {
      const nid = hits[0].object.userData.nodeId
      if (this.hoveredId !== nid) {
        if (this.hoveredId) {
          const prev = this.nodes.get(this.hoveredId)
          if (prev && this.hoveredId !== this.selectedId) {
            prev.mesh.material.emissiveIntensity = 0.15
            prev.glow.material.opacity = 0.08
          }
        }
        this.hoveredId = nid
        const entry = this.nodes.get(nid)
        if (entry && nid !== this.selectedId) {
          entry.mesh.material.emissiveIntensity = 0.5
          entry.glow.material.opacity = 0.2
        }
        this.renderer.domElement.style.cursor = 'pointer'
        if (this.onNodeHover) this.onNodeHover(entry?.data || null)
      }
    } else {
      if (this.hoveredId) {
        const prev = this.nodes.get(this.hoveredId)
        if (prev && this.hoveredId !== this.selectedId) {
          prev.mesh.material.emissiveIntensity = 0.15
          prev.glow.material.opacity = 0.08
        }
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
      const entry = this.nodes.get(nid)
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
