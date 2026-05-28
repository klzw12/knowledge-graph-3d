/**
 * 🎥 CameraController — 球坐标相机控制
 * 
 * 功能：
 * - 球坐标系统的鼠标拖拽旋转/滚轮缩放
 * - flyTo 动画（点击节点平滑移动相机）
 * - 空闲自动旋转（5 秒无操作启动）
 * - 触屏支持
 */

import * as THREE from 'three'

const PI = Math.PI
const PI_2 = PI / 2

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera
    this.dom = domElement

    // 球坐标
    this.spherical = new THREE.Spherical(8, PI_2, 0)
    this.targetSpherical = this.spherical.clone()
    this.orbitCenter = new THREE.Vector3(0, 0, 0)
    this.targetCenter = new THREE.Vector3(0, 0, 0)

    // 拖拽状态
    this.isDragging = false
    this.mouseDownPos = { x: 0, y: 0 }
    this.lastMouse = { x: 0, y: 0 }

    // 自动旋转
    this.autoOrbit = true
    this.autoOrbitTimeout = null
    this.autoRotateSpeed = 0.06

    // flyTo 动画
    this.isAnimating = false
    this.flyProgress = 0
    this.flyStart = { theta: 0, phi: 0, radius: 0 }
    this.flyEnd = { theta: 0, phi: 0, radius: 0 }
    this.flyCenterStart = new THREE.Vector3()
    this.flyCenterEnd = new THREE.Vector3()
    this.flyStartTime = 0
    this.flyDuration = 1.2
    this.flyCallback = null

    // 边界
    this.minRadius = 3
    this.maxRadius = 30
    this.minPhi = 0.2
    this.maxPhi = PI - 0.2

    this._bindEvents()
    this._updateCamera()
  }

  _bindEvents() {
    const el = this.dom
    el.addEventListener('mousedown', (e) => this._onMouseDown(e))
    el.addEventListener('mousemove', (e) => this._onMouseMove(e))
    el.addEventListener('mouseup', (e) => this._onMouseUp(e))
    el.addEventListener('wheel', (e) => this._onWheel(e), { passive: false })
    el.addEventListener('dblclick', (e) => this._onDblClick && this._onDblClick(e))

    // 触屏
    el.addEventListener('touchstart', (e) => this._onTouchStart(e), { passive: false })
    el.addEventListener('touchmove', (e) => this._onTouchMove(e), { passive: false })
    el.addEventListener('touchend', (e) => this._onTouchEnd(e), { passive: false })
  }

  _onMouseDown(e) {
    this.isDragging = true
    this.mouseDownPos = { x: e.clientX, y: e.clientY }
    this.lastMouse = { x: e.clientX, y: e.clientY }
    this.autoOrbit = false
    this._clearAutoOrbitTimeout()
  }

  _onMouseMove(e) {
    if (this.isDragging) {
      const dx = e.clientX - this.lastMouse.x
      const dy = e.clientY - this.lastMouse.y
      this.lastMouse = { x: e.clientX, y: e.clientY }
      this.targetSpherical.theta -= dx * 0.006
      this.targetSpherical.phi = Math.max(this.minPhi, Math.min(this.maxPhi, this.targetSpherical.phi - dy * 0.006))
    }
  }

  _onMouseUp(e) {
    this.isDragging = false
    const dist = Math.abs(e.clientX - this.mouseDownPos.x) + Math.abs(e.clientY - this.mouseDownPos.y)
    if (dist < 5 && this._onClick) {
      this._onClick(e)
    }
    this._scheduleAutoOrbit()
  }

  _onWheel(e) {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 1.12 : 0.88
    this.targetSpherical.radius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetSpherical.radius * factor))
    this._scheduleAutoOrbit()
  }

  _onTouchStart(e) {
    e.preventDefault()
    if (e.touches.length === 1) {
      const t = e.touches[0]
      this.isDragging = true
      this.lastMouse = { x: t.clientX, y: t.clientY }
      this.autoOrbit = false
      this._clearAutoOrbitTimeout()
    }
  }

  _onTouchMove(e) {
    e.preventDefault()
    if (e.touches.length === 1 && this.isDragging) {
      const t = e.touches[0]
      const dx = t.clientX - this.lastMouse.x
      const dy = t.clientY - this.lastMouse.y
      this.lastMouse = { x: t.clientX, y: t.clientY }
      this.targetSpherical.theta -= dx * 0.008
      this.targetSpherical.phi = Math.max(this.minPhi, Math.min(this.maxPhi, this.targetSpherical.phi - dy * 0.008))
    } else if (e.touches.length === 2) {
      // 双指缩放
      const t0 = e.touches[0], t1 = e.touches[1]
      const dist = Math.sqrt((t0.clientX - t1.clientX) ** 2 + (t0.clientY - t1.clientY) ** 2)
      if (this._lastTouchDist) {
        const factor = this._lastTouchDist / dist
        this.targetSpherical.radius = Math.max(this.minRadius, Math.min(this.maxRadius, this.targetSpherical.radius * factor))
      }
      this._lastTouchDist = dist
    }
  }

  _onTouchEnd(e) {
    e.preventDefault()
    this.isDragging = false
    this._lastTouchDist = 0
    this._scheduleAutoOrbit()
  }

  // ─── flyTo 动画 ───
  flyToNode(node, callback) {
    if (this.isAnimating) {
      this.flyCallback = null
    }

    // 目标位置：从节点位置偏移一段距离
    const target = new THREE.Vector3(node.x, node.y, node.z)
    const newSpherical = new THREE.Spherical()
    const offset = new THREE.Vector3()

    // 保持当前视角方向，但拉近到节点附近
    const currentPos = this.camera.position.clone()
    const dir = currentPos.clone().sub(this.orbitCenter).normalize()
    const dist = Math.max(4, currentPos.distanceTo(target) * 0.4)
    offset.copy(dir).multiplyScalar(dist)
    const flyTo = target.clone().add(offset)

    newSpherical.setFromVector3(flyTo.clone().sub(target))
    this.flyCenterStart.copy(this.orbitCenter)
    this.flyCenterEnd.copy(target)
    this.flyStart.theta = this.spherical.theta
    this.flyStart.phi = this.spherical.phi
    this.flyStart.radius = this.spherical.radius
    this.flyEnd.theta = newSpherical.theta
    this.flyEnd.phi = newSpherical.phi
    this.flyEnd.radius = newSpherical.radius

    this.isAnimating = true
    this.flyStartTime = performance.now()
    this.flyCallback = callback || null
    this.autoOrbit = false
    this._clearAutoOrbitTimeout()
  }

  _updateFlyAnimation(now) {
    if (!this.isAnimating) return

    const t = Math.min(1, (now - this.flyStartTime) / (this.flyDuration * 1000))
    // easeOutCubic
    const ease = 1 - Math.pow(1 - t, 3)

    this.spherical.theta = this.flyStart.theta + (this.flyEnd.theta - this.flyStart.theta) * ease
    this.spherical.phi = this.flyStart.phi + (this.flyEnd.phi - this.flyStart.phi) * ease
    this.spherical.radius = this.flyStart.radius + (this.flyEnd.radius - this.flyStart.radius) * ease
    this.orbitCenter.lerpVectors(this.flyCenterStart, this.flyCenterEnd, ease)

    // 同步 target
    this.targetSpherical.copy(this.spherical)
    this.targetCenter.copy(this.orbitCenter)

    if (t >= 1) {
      this.isAnimating = false
      if (this.flyCallback) {
        this.flyCallback()
        this.flyCallback = null
      }
      this._scheduleAutoOrbit()
    }
  }

  // ─── 自动旋转 ───
  _scheduleAutoOrbit() {
    this._clearAutoOrbitTimeout()
    this.autoOrbitTimeout = setTimeout(() => {
      this.autoOrbit = true
    }, 5000)
  }

  _clearAutoOrbitTimeout() {
    if (this.autoOrbitTimeout) {
      clearTimeout(this.autoOrbitTimeout)
      this.autoOrbitTimeout = null
    }
  }

  // ─── 重置视角 ───
  resetView() {
    this.targetCenter.set(0, 0, 0)
    this.orbitCenter.set(0, 0, 0)
    this.targetSpherical.set(8, PI_2, 0)
  }

  // ─── 每帧更新 ───
  update(now) {
    // flyTo 动画
    this._updateFlyAnimation(now)

    // 自动旋转
    if (this.autoOrbit && !this.isAnimating) {
      this.targetSpherical.theta += this.autoRotateSpeed * 0.016 // ~60fps 归一化
    }

    // 平滑插值
    if (!this.isAnimating) {
      this.spherical.theta += (this.targetSpherical.theta - this.spherical.theta) * 0.08
      this.spherical.phi += (this.targetSpherical.phi - this.spherical.phi) * 0.08
      this.spherical.radius += (this.targetSpherical.radius - this.spherical.radius) * 0.1
      this.orbitCenter.lerp(this.targetCenter, 0.08)
    }

    this._updateCamera()
  }

  _updateCamera() {
    const pos = new THREE.Vector3().setFromSpherical(this.spherical)
    pos.add(this.orbitCenter)
    this.camera.position.copy(pos)
    this.camera.lookAt(this.orbitCenter)
  }

  // ─── 事件回调注册（外部设置） ───
  onClick(cb) { this._onClick = cb }
  onDblClick(cb) { this._onDblClick = cb }

  dispose() {
    this._clearAutoOrbitTimeout()
  }
}
