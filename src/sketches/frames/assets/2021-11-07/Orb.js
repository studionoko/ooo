import cf from './config'
import { rangeFloor } from 'canvas-sketch-util/random'

export default class Orb {
  constructor(ctx, x, y, radius) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.radius = radius

    this.draw()
  }

  draw() {
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.createFill()
    this.ctx.fill()

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
    const fill = this.ctx.createRadialGradient(
      this.x, this.y, this.radius,
      this.x + this.radius, this.y + this.radius, this.radius
    )
    const c1r = rangeFloor(200, 255)
    const c2b = rangeFloor(0, 255)

    fill.addColorStop(0, `rgb(${c1r}, 200, 120)`);
    fill.addColorStop(1, `rgb(${c1r}, 0, ${c2b})`);

    return fill
  }
}