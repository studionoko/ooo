import ASScroll from '@ashthornton/asscroll'

export default class Scroll {
  constructor() {
    this.initialized = false
    this.scroll = undefined
    this.el = undefined
    this.pos = 0

    this.init = this.init.bind(this)
    this.destroy = this.destroy.bind(this)
    this.update = this.update.bind(this)
    this.to = this.to.bind(this)

    this.init()
  }

  init() {
    this.scroll = new ASScroll({
      disableRaf: true,
    })
    this.scroll.enable({
      restore: false,
    })
    this.el = this.scroll.containerElement

    this.initialized = true
  }

  destroy() {
    this.scroll.disable()
    this.initialized = false
  }

  to(...args) {
    this.scroll.scrollTo(...args)
  }

  on(ev, callback) {
    this.scroll.on(ev, callback)
  }

  off(ev, callback) {
    this.scroll.off(ev, callback)
  }

  get position() {
    return Math.abs(this.scroll.controller.currentPos)
  }

  set position(pos) {
    this.scroll.currentPos = pos
  }

  update() {
    if (this.initialized) {
      this.scroll.update()
      this.pos = this.scroll.controller.currentPos
    }
  }
}