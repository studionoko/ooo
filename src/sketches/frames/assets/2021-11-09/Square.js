import { range } from 'canvas-sketch-util/random'
import { mapRange } from 'canvas-sketch-util/math'

export default class Square {
  constructor(ctx, x, y, size, index, maxIndex) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.size = size
    this.index = index

    const max = (index * index/1000)
    this.deg = range(-max, max)

    this.strokeWidth = mapRange(index, 0, maxIndex, range(1,3), 0.5)

    this.draw()
  }

  draw() {
    const { x, y, size } = this
    this.ctx.save()
    this.ctx.translate(x, y)
    this.ctx.beginPath()
    this.ctx.lineWidth = this.strokeWidth
    this.ctx.strokeStyle = 'red'
    this.ctx.rotate(this.deg * Math.PI/180)
    this.ctx.rect(0, 0, size, size)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
  }
}