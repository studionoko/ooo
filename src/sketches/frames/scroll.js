import ASScroll from '@ashthornton/asscroll'

export default class Scroll {
  constructor() {
    this.initialized = false
    this.scroll = undefined
    this.observed = []
    this.pos = 0

    this.init = this.init.bind(this)
    this.destroy = this.destroy.bind(this)
    this.update = this.update.bind(this)
    this.observe = this.observe.bind(this)
    this.to = this.to.bind(this)

    this.observedIndex = 0

    this.init()
  }

  init() {
    this.scroll = new ASScroll({ disableRaf: true })
    this.scroll.enable({ restore: true })

    this.initialized = true
  }

  destroy() {
    this.scroll.disable()
    this.initialized = false
  }

  to(pos) {
    this.scroll.scrollTo(pos)
  }

  toIndex(i) {
    const pos = this.observed[i].ref.offsetTop
    this.scroll.scrollTo(pos)
  }

  observe(els) {
    this.observed.push(...els)
  }

  update() {
    if (this.initialized) {
      this.scroll.update()
      this.pos = this.scroll.controller.currentPos


      // This is too fucking ingewikkeld. Må finne noko enklare
      // // If there are elements to observe, traverse them…
      // const len = this.observed.length
      // for (let i = 0; i < len; i++) {

      //   // Ignore all cases where the component we're looking at
      //   // is already active
      //   if (this.observedIndex === i) break

      //   // Current component we're looking at..
      //   const current = this.observed[i]

      //   // Is it in view?

      //   if (current.ref.offsetTop < Math.abs(this.pos)) {
      //     if (i !== this.observedIndex) {
      //       this.observedIndex = i

      //       const isNext = i < len-1
      //       const next = isNext ? this.observed[i+1] : null

      //       if (isNext) next.component.setNext()
      //     }
      //   }
      // }

    }
  }
}