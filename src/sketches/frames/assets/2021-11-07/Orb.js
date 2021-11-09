import cf from './config'
import { range, noise2D } from 'canvas-sketch-util/random'
import { mapRange } from 'canvas-sketch-util/math'

export default class Orb {
  constructor(ctx, x, y, radius, index) {
    this.ctx = ctx

    const noise = noise2D(x, y, 5, 0.2)
    this.x = x + x * noise
    this.y = y + y * noise

    this.radius = radius/1.5 + range(index/4, index/1.2)
    this.blur = mapRange(index, 0, 50, 30, 0)
    this.shadow = mapRange(index, 0, 50, 0, range(3, 7))
    this.shine = mapRange(index, 0, range(0,20), 0, range(8, 10))
    this.index = index

    this.draw()
  }

  draw() {
    this.createShadow()

    this.ctx.beginPath()
    this.ctx.filter = `blur(${this.blur}px`
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.createFill()
    this.ctx.closePath()

    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.createShine()
    this.ctx.restore()
  }

  createFill() {
    const fill = this.ctx.createRadialGradient(
      this.x, this.y, this.radius,
      this.x + this.radius / 2, this.y + this.radius / 2, this.radius
    )
    const b = range(0, 100)
    const h = range(250, 350)
    fill.addColorStop(0, `hsl(0, 100%, ${b}%`)
    fill.addColorStop(1, `hsl(${h}, 100%, 50%)`)
    this.ctx.fillStyle = fill
    this.ctx.fill()
  }
  createShine() {
    const fill = this.ctx.createRadialGradient(
      this.x, this.y, this.radius,
      this.x , this.y + this.radius / range(2,this.index), this.radius / 2.3
    )
    const b = range(50, 100)
    const intensity = this.shine / 10

    fill.addColorStop(0, `hsla(0, 100%, 70%, 0`)
    fill.addColorStop(1, `hsla(${this.index}, 100%, ${b}%, ${intensity})`)

    this.ctx.fillStyle = fill
    this.ctx.fill()
  }
  createShadow() {
    const intensity = this.shadow / 10
    const fill = this.ctx.createRadialGradient(
      this.x, this.y, this.radius * 1.5,
      this.x, this.y, this.radius * 0.5,
    )
    fill.addColorStop(0, `rgba(0, 0, 0, 0`)
    fill.addColorStop(1, `rgba(0, 0, 0, ${intensity}`)

    this.ctx.beginPath()
    this.ctx.save()
    this.ctx.fillStyle = fill
    this.ctx.arc(this.x, this.y, this.radius * 1.5, 0, 2 * Math.PI)
    this.ctx.globalCompositeOperation = 'multiply'
    this.ctx.fill()
    this.ctx.restore()
    this.ctx.closePath()
  }
}