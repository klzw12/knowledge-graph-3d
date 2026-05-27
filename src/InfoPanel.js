/**
 * 节点详情面板 — 显示节点信息和关联
 */

function getNodeConnections(nodeId, edges, nodeMap) {
  const connected = []
  const seen = new Set()
  for (const e of edges) {
    if (e.source === nodeId && !seen.has(e.target)) {
      const n = nodeMap.get(e.target)
      if (n) connected.push({ node: n, relation: e.label, dir: 'out' })
      seen.add(e.target)
    }
    if (e.target === nodeId && !seen.has(e.source)) {
      const n = nodeMap.get(e.source)
      if (n) connected.push({ node: n, relation: e.label, dir: 'in' })
      seen.add(e.source)
    }
  }
  return connected
}

export class InfoPanel {
  constructor(edges, nodeMap) {
    this.edges = edges
    this.nodeMap = nodeMap
    this.panel = document.getElementById('info-panel')
    this.label = document.getElementById('info-panel-label')
    this.desc = document.getElementById('info-panel-description')
    this.content = document.getElementById('info-panel-content')
    this.connections = document.getElementById('info-panel-connections')
    this.urlLink = document.getElementById('info-panel-url')
    this.closeBtn = document.getElementById('info-panel-close')
    this.closeBtn.addEventListener('click', () => this.hide())
  }

  show(nodeData) {
    if (!nodeData) { this.hide(); return }

    this.label.textContent = `🕸️ ${nodeData.label}`
    this.desc.textContent = nodeData.description || ''

    // Content
    this.content.innerHTML = ''
    if (nodeData.content) {
      const p = document.createElement('p')
      p.className = 'info-summary'
      p.textContent = nodeData.content.summary || ''
      this.content.appendChild(p)
      if (nodeData.content.tags) {
        const tags = document.createElement('div')
        tags.className = 'info-tags'
        nodeData.content.tags.forEach(t => {
          const s = document.createElement('span')
          s.className = 'info-tag'
          s.textContent = t
          tags.appendChild(s)
        })
        this.content.appendChild(tags)
      }
    }

    // Connections
    this.connections.innerHTML = ''
    const conns = getNodeConnections(nodeData.id, this.edges, this.nodeMap)
    if (conns.length > 0) {
      const title = document.createElement('div')
      title.className = 'info-subtitle'
      title.textContent = `关联 (${conns.length})`
      this.connections.appendChild(title)
      const list = document.createElement('div')
      list.className = 'info-connections'
      conns.forEach(c => {
        const item = document.createElement('a')
        item.className = 'info-conn-link'
        item.href = '#'
        item.innerHTML = `
          <span class="conn-dot" style="background:${c.node.color}"></span>
          <span class="conn-label">${c.node.label}</span>
          <span class="conn-relation">${c.relation || '—'}</span>
        `
        item.addEventListener('click', (e) => {
          e.preventDefault()
          document.dispatchEvent(new CustomEvent('kg:focus', { detail: { nodeId: c.node.id } }))
        })
        list.appendChild(item)
      })
      this.connections.appendChild(list)
    } else {
      const empty = document.createElement('div')
      empty.className = 'info-subtitle'
      empty.textContent = '暂无关联'
      this.connections.appendChild(empty)
    }

    // URL
    if (nodeData.url) {
      this.urlLink.href = nodeData.url
      this.urlLink.classList.remove('hidden')
    } else {
      this.urlLink.classList.add('hidden')
    }

    this.panel.classList.remove('hidden')
  }

  hide() {
    this.panel.classList.add('hidden')
  }
}
