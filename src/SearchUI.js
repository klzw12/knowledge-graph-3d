/**
 * 🔍 SearchUI — 搜索面板 + 快速 Domain 导航
 */

export class SearchUI {
  /**
   * @param {Array} nodes - 所有节点
   * @param {object} opts - 回调
   * @param {Function} opts.onHighlight - (matchedIds) => void
   * @param {Function} opts.onSelect - (node) => void
   * @param {Function} opts.onDomainSelect - (domainId) => void 点击 domain chip
   * @param {Array} domains - [{id, label, color}] 要显示的 domain 列表
   * @param {HTMLElement} container
   */
  constructor(nodes, opts, domains, container) {
    this.nodes = nodes
    this._onHighlight = opts.onHighlight
    this._onSelect = opts.onSelect
    this._onDomainSelect = opts.onDomainSelect
    this._domains = domains || []
    this._lastResults = []
    this._activeDomain = null

    this._build(container)
  }

  _build(container) {
    this.wrapper = document.createElement('div')
    this.wrapper.id = 'search-wrap'

    // ── 输入栏 ──
    const row = document.createElement('div')
    row.id = 'search-row'
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
    row.appendChild(this.input)
    row.appendChild(this.count)
    row.appendChild(this.clear)
    this.wrapper.appendChild(row)

    // ── Domain 快速导航栏 ──
    this.domainBar = document.createElement('div')
    this.domainBar.id = 'domain-bar'
    for (const d of this._domains) {
      const chip = document.createElement('span')
      chip.className = 'domain-chip'
      chip.dataset.domain = d.id
      chip.innerHTML = `<span class="domain-dot" style="background:${d.color}"></span>${d.label}`
      chip.addEventListener('click', () => this._selectDomain(d.id))
      this.domainBar.appendChild(chip)
    }
    this.wrapper.appendChild(this.domainBar)

    // ── 结果列表 ──
    this.results = document.createElement('div')
    this.results.id = 'search-results'
    this.results.style.display = 'none'
    this.wrapper.appendChild(this.results)

    container.appendChild(this.wrapper)
    this._bindEvents()
  }

  _bindEvents() {
    let debounceTimer = null
    this.input.addEventListener('input', () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => this._search(), 120)
    })
    this.input.addEventListener('focus', () => {
      if (this._lastResults.length > 0) this.results.style.display = 'block'
    })
    document.addEventListener('click', (e) => {
      if (!this.wrapper.contains(e.target)) this.results.style.display = 'none'
    })
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { this.clearSearch(); this.results.style.display = 'none'; return }
      if (e.key === 'Enter') {
        this.results.style.display = 'none'
        const firstId = this._lastResults[0]
        if (firstId) {
          const node = this.nodes.find(n => n.id === firstId)
          if (node && this._onSelect) this._onSelect(node)
        }
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const items = this.results.querySelectorAll('.search-result-item')
        if (!items.length) return
        const active = this.results.querySelector('.search-result-item.active')
        let idx = Array.from(items).indexOf(active)
        idx = e.key === 'ArrowDown' ? Math.min(idx + 1, items.length - 1) : Math.max(idx - 1, 0)
        items.forEach(el => el.classList.remove('active'))
        items[idx].classList.add('active')
        items[idx].scrollIntoView({ block: 'nearest' })
      }
    })
    this.clear.addEventListener('click', () => this.clearSearch())
  }

  _selectDomain(domainId) {
    // toggle
    if (this._activeDomain === domainId) {
      this._activeDomain = null
      this.domainBar.querySelectorAll('.domain-chip').forEach(c => c.classList.remove('active'))
      if (this._onDomainSelect) this._onDomainSelect(null)
      if (this._onHighlight) this._onHighlight([])
      return
    }
    this._activeDomain = domainId
    this.domainBar.querySelectorAll('.domain-chip').forEach(c => c.classList.remove('active'))
    this.domainBar.querySelector(`[data-domain="${domainId}"]`)?.classList.add('active')

    // 找到该 domain 下的所有节点
    const matched = this.nodes.filter(n => n._parentDomain === domainId || n.id === domainId)
    const ids = matched.map(n => n.id)
    if (this._onHighlight) this._onHighlight(ids)
    if (this._onDomainSelect) this._onDomainSelect(domainId)
  }

  _search() {
    const q = this.input.value.trim().toLowerCase()
    if (!q) { this._clearResults(); return }

    const results = this.nodes.filter(n => {
      const label = (n.label || '').toLowerCase()
      const desc = (n.description || '').toLowerCase()
      const id = (n.id || '').toLowerCase()
      return label.includes(q) || desc.includes(q) || id.includes(q)
    })
    this._lastResults = results.map(n => n.id)
    this.count.textContent = ` ${results.length} 个`
    this.count.style.display = results.length > 0 ? 'inline' : 'none'
    this.clear.style.display = 'inline'

    if (this._onHighlight) this._onHighlight(this._lastResults)
    this._renderResults(results, q)
  }

  _renderResults(results, query) {
    this.results.innerHTML = ''
    if (results.length === 0) { this.results.style.display = 'none'; return }

    const shown = results.slice(0, 20)
    for (const node of shown) {
      const item = document.createElement('div')
      item.className = 'search-result-item'
      const label = node.label || node.id
      const idx = label.toLowerCase().indexOf(query)
      let displayLabel = label
      if (idx >= 0) {
        displayLabel = label.slice(0, idx) +
          '<mark>' + label.slice(idx, idx + query.length) + '</mark>' +
          label.slice(idx + query.length)
      }
      const depth = node._depth || 0
      const icon = depth === 0 ? '🌳' : (node._children?.length > 0 ? '📂' : '📄')
      item.innerHTML = `
        <span class="sri-icon">${icon}</span>
        <span class="sri-label">${displayLabel}</span>
        <span class="sri-path" style="color:${node.color}">●</span>
      `
      item.addEventListener('click', () => { this.results.style.display = 'none'; if (this._onSelect) this._onSelect(node) })
      item.addEventListener('mouseenter', () => {
        this.results.querySelectorAll('.search-result-item.active').forEach(el => el.classList.remove('active'))
        item.classList.add('active')
      })
      this.results.appendChild(item)
    }
    if (results.length > 20) {
      const more = document.createElement('div')
      more.className = 'search-result-more'
      more.textContent = `⋯ 还有 ${results.length - 20} 个匹配`
      this.results.appendChild(more)
    }
    const first = this.results.querySelector('.search-result-item')
    if (first) first.classList.add('active')
    this.results.style.display = 'block'
  }

  _clearResults() {
    this.count.textContent = ''
    this.count.style.display = 'none'
    this.clear.style.display = 'none'
    this.results.innerHTML = ''
    this.results.style.display = 'none'
    this._lastResults = []
    if (this._onHighlight) this._onHighlight([])
  }

  clearSearch() {
    this.input.value = ''
    this._clearResults()
    if (this._activeDomain) {
      this._activeDomain = null
      this.domainBar.querySelectorAll('.domain-chip').forEach(c => c.classList.remove('active'))
      if (this._onDomainSelect) this._onDomainSelect(null)
    }
    this.input.focus()
  }

  clearDomainFilter() {
    if (this._activeDomain) {
      this._activeDomain = null
      this.domainBar.querySelectorAll('.domain-chip').forEach(c => c.classList.remove('active'))
      if (this._onDomainSelect) this._onDomainSelect(null)
      if (this._onHighlight) this._onHighlight([])
    }
  }

  setNodes(nodes) { this.nodes = nodes }
  focus() { this.input.focus() }
}
