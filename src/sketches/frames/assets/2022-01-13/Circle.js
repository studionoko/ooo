import { range, noise2D } from 'canvas-sketch-util/random'

const cos = (f, of) => Math.cos((f-of)/60)
const sin = (f, of) => Math.sin((f-of)/60)
const x = (f=0, r=0, of=0, pow) => r / 2 + sin(f, of) * pow

export default class Circle {
  constructor(ctx, width, height, radius, offset, blur, fillstops) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.x = width/2
    this.y = height/2
    this.radius = radius
    this.blur = blur
    this.offset = offset
    this.fillStops = fillstops

    this.draw(0)

    this.draw = this.draw.bind(this)
    this.createFill = this.createFill.bind(this)
    this.getPos = this.getPos.bind(this)
  }

  getPos(frame, xo, yo) {
    this.x = this.width - x(frame, this.width, this.offset, this.width/xo)
    this.y = this.height / 2 - cos(frame, this.offset) * this.height/yo
  }

  draw(frame, xo=1, yo=1, r=1) {
    this.radius = r
    this.getPos(frame, xo, yo)

    this.ctx.beginPath()
    this.ctx.filter = `blur(${(sin(frame, 0) * 1) * this.blur}px`
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.createFill(frame)
    this.ctx.fill()
    this.ctx.closePath()
  }

  createFill(frame) {
    const fill = this.ctx.createRadialGradient(
      this.x, this.y, this.radius,
      this.x - (this.radius * cos(frame, this.offset / 100) / 1.5),
      this.y - (this.radius * sin(frame, this.offset / 100) / 1.5),
      this.radius / 4
    )
    this.fillStops.forEach((f, i) => fill.addColorStop(i, f))
    return fill
  }
}