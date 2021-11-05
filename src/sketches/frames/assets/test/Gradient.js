import cf from './config'
import random from 'canvas-sketch-util/random'

export default class Gradient {
  constructor(ctx, x, y, width, height, frame) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.frame = frame

    this.draw()
  }

  draw() {
    this.ctx.fillStyle = this.createFill()
    this.ctx.fillRect(this.x, this.y, this.width, this.height)

    // dev mode
    if (cf.dev) {
      this.ctx.fillStyle = 'white'
      this.ctx.strokeStyle = 'white'
      this.ctx.strokeRect(this.x, this.y, this.width, this.height)
      this.ctx.fillText(`${this.x}, ${this.y}`, this.x, this.y + 10)
      this.ctx.fillText(`${this.width}, ${this.height}`, this.x, this.y + 20)
    }
  }

  createFill() {
    const fill = this.ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height)
    const c1r = random.rangeFloor(200, 255)
    const c2b = random.rangeFloor(0, 255)

    fill.addColorStop(0, `rgb(${c1r}, ${Math.cos(this.frame * 10)}, 120)`);
    fill.addColorStop(1, `rgb(${c2b}, 100, ${c1r})`);

    return fill
  }
}