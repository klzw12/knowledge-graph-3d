/**
 * 🔍 SearchUI — 搜索面板
 * 
 * 在顶部显示搜索框，输入时实时过滤节点
 */

export class SearchUI {
  constructor(nodes, onHighlight, onSelect, container) {
    this.nodes = nodes
    this._onHighlight = onHighlight    // (matchedIds) => void
    this._onSelect = onSelect          // (node) => void
    this._visible = false

    this._build(container)
  }

  _build(container) {
    this.wrapper = document.createElement('div')
    this.wrapper.id = 'search-wrap'

    this.input = document.createElement('input')
    this.input.id = 'search-input'
    this.input.type = 'text'
    this.input.placeholder = '🔍 搜索节点...'

    this.count = document.createElement('span')
    this.count.id = 'search-count'

    this.clear = document.createElement('button')
    this.clear.id = 'search-clear'
    this.clear.textContent = '✕'
    this.clear.style.display = 'none'

    this.wrapper.appendChild(this.input)
    this.wrapper.appendChild(this.count)
    this.wrapper.appendChild(this.clear)
    container.appendChild(this.wrapper)

    this._bindEvents()
  }

  _bindEvents() {
    let debounceTimer = null

    this.input.addEventListener('input', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => this._search(), 150)
    })

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.clearSearch()
      }
      if (e.key === 'Enter') {
        // 选中第一个结果
        const results = this._lastResults
        if (results && results.length > 0) {
          const idx = this.nodes.findIndex(n => n.id === results[0])
          if (idx >= 0 && this._onSelect) this._onSelect(this.nodes[idx])
        }
      }
    })

    this.clear.addEventListener('click', () => this.clearSearch())
  }

  _search() {
    const q = this.input.value.trim().toLowerCase()
    if (!q) {
      this.clear.highlight()
      return
    }

    const results = this.nodes.filter(n => {
      const label = (n.label || '').toLowerCase()
      const desc = (n.description || '').toLowerCase()
      const id = (n.id || '').toLowerCase()
      return label.includes(q) || desc.includes(q) || id.includes(q)
    })

    this._lastResults = results.map(n => n.id)
    this.count.textContent = ` ${results.length} 个匹配`
    this.count.style.display = results.length > 0 ? 'inline' : 'none'
    this.clear.style.display = 'inline'

    if (this._onHighlight) {
      this._onHighlight(this._lastResults)
    }
  }

  setNodes(nodes) {
    this.nodes = nodes
  }

  clearSearch() {
    this.input.value = ''
    this.count.textContent = ''
    this.count.style.display = 'none'
    this.clear.style.display = 'none'
    this._lastResults = []
    if (this._onHighlight) this._onHighlight([])
    this.input.focus()
  }

  focus() {
    this.input.focus()
  }
}
