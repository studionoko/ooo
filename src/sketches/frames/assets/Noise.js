export default class Noise {
  constructor(ctx, width, height, color) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.color = color || 0xaa0000ff

    this.drawn = false
    this.noise = null

    this.draw()
  }

  draw() {
    if (this.drawn) return
    this.drawn = true

    const dt = this.ctx.createImageData(this.width, this.height)
    const buff = new Uint32Array(dt.data.buffer)
    const len = buff.length

    for (let i = 0; i < len; i += 1) {
      if (Math.random() < 0.5) buff[i] = this.color
    }

    this.noise = dt

    this.ctx.globalCompositeOperation = 'overlay'
    this.ctx.putImageData(this.noise, 0, 0)
  }
}